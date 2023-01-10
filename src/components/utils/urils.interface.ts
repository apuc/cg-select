import { IItems } from '../../interfaces/items.interface';

export interface IDataItem {
  category?: string;
  categoryItems?: string;
  ItemValue: string | IItems | number;
}

export interface ISelectedItems {
  placeholder?: string;
  selected?: string;
  selectedItems?: string[];
  indexes?: number[];
  multiselectTag?: boolean;
  darkTheme?: boolean;
}
