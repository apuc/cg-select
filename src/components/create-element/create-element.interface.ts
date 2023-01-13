import { ICgSelect } from '../../interfaces/cg-select.interface';

export interface ICreateBreadCrumb {
  /**
   * Определенный экземпляр класса.
   * @type {Element | null}
   */
  element: Element | null;
  /**
   * Настройки селекта.
   * @type {ICgSelect}
   */
  option: ICgSelect;
  /**
   * Массив индексов выбранных элементов.
   * @type {number[]}
   */
  indexes: number[];
  /**
   * Массив с выбранными элементами.
   * @type {string[]}
   */
  selectedItems: string[];
}
