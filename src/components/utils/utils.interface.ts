import { CustomTheme, CustomThemeJson } from 'components/theme/theme.interface';
import { IItems } from 'interfaces/items.interface';

/**
 * @description Receive Item Settings.
 */
export interface IDataItem {
  /**
   * Optional parameter. Item group category.
   * @type {string}
   */
  category?: string;
  /**
   * Optional parameter. Array with elements.
   * @type {IItems[] | string[] | any}
   */
  categoryItems?: IItems[] | string[];
  /**
   * The value of the passed element.
   * @type {string | IItems | number}
   */
  ItemValue: string | IItems | number;
}

/**
 * @description Settings for select text, etc.
 */
export interface ISelectedItems {
  /**
   * Placeholder  optional parameter to which the text of the select placeholder is passed.
   * @type {string}
   */
  placeholder?: string;
  /**
   * An optional parameter, which is passed the element that will be selected initially in the select.
   * @type {string}
   */
  selected?: string;
  /**
   * Array of selected items from the list.
   * @type {string[]}
   */
  selectedItems?: string[];
  /**
   * Array of indexes of selected elements.
   * @type {number[]}
   */
  indexes?: number[];
  /**
   * An optional parameter that is responsible for the behavior of the select,
   * for him, *** works only in a place with a multiselect connection.
   * @type {boolean}
   */
  multiselectTag?: boolean;
  /**
   * An optional parameter that is responsible for enabling a light/dark theme by default, the dark theme is set.
   * @type {boolean}
   */
  theme?: string | CustomTheme | CustomThemeJson;
}
