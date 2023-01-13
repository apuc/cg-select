import { IItems } from '../../interfaces/items.interface';

export interface IDataItem {
  /**
   * Необязательный параметр. Категория группы элементов.
   * @type {string}
   */
  category?: string;
  /**
   * Необязательный параметр. Массив с элементами.
   * @type {IItems[] | string[] | any}
   */
  categoryItems?: IItems[] | string[] | any;
  /**
   * Значение переданного элемента.
   * @type {string | IItems | number}
   */
  ItemValue: string | IItems | number;
}

export interface ISelectedItems {
  /**
   * Placeholder  необязательный параметр, в который передается текст плейсхолдера селекта.
   * @type {string}
   */
  placeholder?: string;
  /**
   * Необязательный параметр, в который передается элемент который будет выбран изначально в селекте.
   * @type {string}
   */
  selected?: string;
  /**
   * Массив выбранных элементов из списка
   * @type {string[]}
   */
  selectedItems?: string[];
  /**
   * Массив индексов выбранных элементов
   * @type {number[]}
   */
  indexes?: number[];
  /**
   * Необязательный параметр, который отвечает за поведения селекта,
   * для него, ***работает только в месте с подключением multiselect.
   * @type {boolean}
   */
  multiselectTag?: boolean;
  /**
   * Необязательный параметр, который отвечает за включение светлой/темной темы по умолчанию, стоит темная тема.
   * @type {boolean}
   */
  darkTheme?: boolean;
}
