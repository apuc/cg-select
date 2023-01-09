import { ICgSelect } from '../../interfaces/cg-select.interface';

export interface IcreateBreadCrumb {
  element: Element | null;
  option: ICgSelect;
  indexes: number[];
  selectedItems: string[];
}
