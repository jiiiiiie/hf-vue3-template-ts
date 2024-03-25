// @ts-nocheck
import { defineStore } from "pinia";
import store from "../index";
import type { DictDataVO } from "@/api/system/dict/types";
import { CACHE_KEY, useCache } from "@/hooks/web/useCache";
const { wsCache } = useCache("sessionStorage");
import { listSimpleDictData } from "@/api/system/dict/dict.data";

export interface DictValueType {
  value: any;
  label: string;
  clorType?: string;
  cssClass?: string;
}
export interface DictTypeType {
  dictType: string;
  dictValue: DictValueType[];
}
export interface DictState {
  dictLabel: Map<string, scalarObject>;
  dictMap: Map<string, any>;
  isSetDict: boolean;
}

export const useDictStore = defineStore("dict", {
  state: (): DictState => ({
    dictLabel: new Map<string, scalarObject>(),
    dictMap: new Map<string, any>(),
    isSetDict: false
  }),
  getters: {
    getDictMap(): Recordable {
      const { dictMap, dictLabel } = wsCache.get(CACHE_KEY.DICT_CACHE);
      if (dictMap) {
        this.dictMap = dictMap;
        this.dictLabel = dictLabel;
      }
      return this.dictMap;
    },
    getIsSetDict(): boolean {
      return this.isSetDict;
    }
  },
  actions: {
    async setDictMap() {
      const data = wsCache.get(CACHE_KEY.DICT_CACHE);
      if (data) {
        this.dictMap = data.dictMap;
        this.dictLabel = data.dictLabel;
        this.isSetDict = true;
      } else {
        this.resetDict();
      }
    },
    getDictByType(type: string) {
      if (!this.isSetDict) {
        this.setDictMap();
      }
      return this.dictMap[type];
    },
    /**
     *
     * @param type 字典类型 asset_status
     * @param value 字典值
     * @returns
     */
    label(type: string, value: string) {
      try {
        return this.dictLabel[type][value];
      } catch (e) {
        return null;
      }
    },
    async resetDict() {
      const res = await listSimpleDictData();
      // 设置数据
      const dictMap = new Map<string, any>();
      const dictLabel = new Map<string, scalarObject>();
      res.forEach((dictData: DictDataVO) => {
        // 获得 dictType 层级
        const enumValueObj = dictMap[dictData.dictType];
        if (!enumValueObj) {
          dictMap[dictData.dictType] = [];
        }
        // 处理 dictValue 层级
        dictMap[dictData.dictType].push({
          value: dictData.value,
          label: dictData.label,
          colorType: dictData.colorType,
          cssClass: dictData.cssClass
        });
        // 可以根据字典值获得label
        if (dictLabel[dictData.dictType]) {
          dictLabel[dictData.dictType][dictData.value] = dictData.label;
        } else {
          dictLabel[dictData.dictType] = {
            [dictData.value]: dictData.label
          };
        }
      });
      this.dictLabel = dictLabel;
      this.dictMap = dictMap;
      this.isSetDict = true;
      wsCache.set(CACHE_KEY.DICT_CACHE, { dictMap, dictLabel }, { exp: 60 }); // 60 秒 过期
    }
  }
});

export const useDictStoreWithOut = () => {
  return useDictStore(store);
};
