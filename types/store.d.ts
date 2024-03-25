// 界面右上角选择的门店
declare type activeApartment = {
	name: string;
	id: number | string;
	[optional]: any;
};

// 普通数据类型
declare type scalar = string | number | bool | null;

// 普通数据类型对象
declare interface scalarObject {
	[name: string]: scalar;
}
