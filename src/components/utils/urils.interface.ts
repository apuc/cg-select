import { IItems } from "../../interfaces/items.interface";

export interface IDataItem{
    category?: string;
    categoryItems?: string;
    ItemValue: string | IItems | number;
}