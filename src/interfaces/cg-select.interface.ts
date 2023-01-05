import { IItems } from "./items.interface";

export interface ISgSelect {
    selector: string;
    selected?: string;
    placeholder?: string;
    items?: IItems[]| string[] | any;
    darkTheme?: boolean;
    searchMode?: boolean;
    closeOnSelect?:  boolean;
    nativeSelectMode?: boolean;
    listDisplayMode?: boolean;
    language?: string;
    lable?:string;
    styles?: object;
    event?: string;
    url?: string;
    multiselect?: boolean;
    multiselectTag?: boolean;
}