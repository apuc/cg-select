import { ICgSelect } from '../../interfaces/cg-select.interface';

export interface ICreateBreadCrumb {
  element: Element | null;
  option: ICgSelect;
  indexes: number[];
  selectedItems: string[];
}
