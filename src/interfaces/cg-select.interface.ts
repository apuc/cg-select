import { IItems } from './items.interface';

export interface ICgSelect {
  selector: string;
  selected?: string;
  placeholder?: string;
  items?: IItems[] | string[] | any;
  darkTheme?: boolean;
  searchMode?: boolean;
  closeOnSelect?: boolean;
  nativeSelectMode?: boolean;
  listDisplayMode?: boolean;
  language?: string;
  lable?: string;
  styles?: IStyle;
  event?: string;
  url?: string;
  multiselect?: boolean;
  multiselectTag?: boolean;
}

export interface IStyle {
  head?: object;
  caret?: object;
  placeholder?: object;
  lable?: object;
  list?: object;
  search?: object;
}
