import { DataStateEnum } from "./datastate.model";

export interface AppDataState<T> {
	dataState:DataStateEnum;
	data?: T;
	errorMessage?:String 
}
