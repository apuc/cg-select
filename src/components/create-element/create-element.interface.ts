import { ICgSelect } from 'interfaces/cg-select.interface';

/**
 * @description cSettings for creating chips.
 */
export interface ICreateBreadCrumb {
  /**
   * A specific instance of a class.
   * @type {Element | null}
   */
  element: Element | null;
  /**
   * Select settings.
   * @type {ICgSelect}
   */
  option: ICgSelect;
  /**
   * Array of indexes of selected elements.
   * @type {number[]}
   */
  indexes: number[];
  /**
   * Array with selected elements.
   * @type {string[]}
   */
  selectedItems: string[];
}
