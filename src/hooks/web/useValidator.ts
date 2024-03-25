import type { IdType } from "@/types/form";
import { CertificateType } from "@/utils/dict";

type Callback = (error?: string | Error | undefined) => void;

interface LengthRange {
  min: number;
  max: number;
  message: string;
}

export const useValidator = () => {
  const required = (message?: string) => {
    return {
      required: true,
      message: message || "该项为必填项"
    };
  };

  const lengthRange = (val: any, callback: Callback, options: LengthRange) => {
    const { min, max, message } = options;
    if (val.length < min || val.length > max) {
      callback(new Error(message));
    } else {
      callback();
    }
  };

  const notSpace = (val: any, callback: Callback, message: string) => {
    // 用户名不能有空格
    if (val.indexOf(" ") !== -1) {
      callback(new Error(message));
    } else {
      callback();
    }
  };

  const notSpecialCharacters = (val: any, callback: Callback, message: string) => {
    // 密码不能是特殊字符
    if (/[`~!@#$%^&*()_+<>?:"{},./;'[\]]/gi.test(val)) {
      callback(new Error(message));
    } else {
      callback();
    }
  };

  // 两个字符串是否想等
  const isEqual = (val1: string, val2: string, callback: Callback, message: string) => {
    if (val1 === val2) {
      callback();
    } else {
      callback(new Error(message));
    }
  };

  /**验证各类证件号码 */
  const verifyIdNumber = <T, U extends IdType>(idNo: T, idType: U, callback: Callback) => {
    let pattern: string | RegExp = "";
    switch (idType) {
      case CertificateType.IdentityCard:
        pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证
        if (!pattern.test(idNo as string)) {
          callback(new Error("请输入正确的身份证号码！"));
        }
        break;
      case CertificateType.Passport:
        pattern =
          /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/; //护照（包括香港和澳门）
        if (!pattern.test(idNo as string)) {
          callback(new Error("请输入正确的护照号码！"));
        }
        break;
      case CertificateType.TaiwaneseId:
        pattern = /^\\d{8}|^[a-zA-Z0-9]{10}|^\\d{18}$/;
        if (!pattern.test(idNo as string)) {
          callback(new Error("请输入正确的台湾通行证号码！"));
        }
        break;
      case CertificateType.HKAndMCPermit:
        pattern = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        if (!pattern.test(idNo as string)) {
          callback(new Error("请输入正确的港澳通行证号码！"));
        }
        break;
      case CertificateType.MilitaryId:
        pattern = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
        if (!pattern.test(idNo as string)) {
          callback(new Error("请输入正确的军官证号码！"));
        }
        break;
    }
    callback();
  };

  /* 是否手机号码*/
  const verifyPhone = (rule: any, value: string, callback: Callback) => {
    const reg = /^1[3-9]\d{9}$/;
    if (!value) {
      callback(new Error("请输入手机号码！"));
    } else {
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号码！"));
      } else {
        callback();
      }
    }
  };

  /* 是否是邮箱*/
  const verifyEMail = (rule: any, value: string, callback: Callback) => {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
    if (!value) {
      callback(new Error("请输入邮箱地址!"));
    } else {
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱地址!"));
      } else {
        callback();
      }
    }
  };
  // 是否是企业统一信用代码
  const verifyCreditCode = (rule: any, value: string, callback: Callback) => {
    const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/;
    if (!value) {
      callback(new Error("请输入企业统一社会信用代码!"));
    } else {
      if (!reg.test(value)) {
        callback(new Error("请输入正确的企业统一社会信用代码!"));
      } else {
        callback();
      }
    }
  };
  return {
    required,
    lengthRange,
    notSpace,
    notSpecialCharacters,
    isEqual,
    verifyIdNumber,
    verifyEMail,
    verifyPhone,
    verifyCreditCode
  };
};
