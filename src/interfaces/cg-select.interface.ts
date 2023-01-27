import { IItems } from './items.interface';

/**
 * @description Select settings.
 */
export interface ICgSelect {
  /**
   * Unique selector - *mandatory parameter (indicator) that is set when creating a select.
   * @type {string}
   */
  selector?: string;
  /**
   * An optional parameter, which is passed the element that will be selected initially in the select.
   * @type {string}
   */
  selected?: string;
  /**
   * Placeholder optional parameter to which the text of the select placeholder is passed.
   * @type {string}
   */
  placeholder?: string;
  /**
   * *Required parameter (if no other way to get data (url) is specified), this is an array of elements,
   *  which will be displayed in the select when selected.
   * @type {IItems[] | string[] | any}
   */
  items?: IItems[] | string[] | any;
  /**
   * An optional parameter responsible for switching between different themes, the classic theme is set by default.
   * @type {string}
   */
  theme?: string;
  /**
   * An optional parameter that adds a live search on the select elements.
   * @type {boolean}
   */
  searchMode?: boolean;
  /**
   * An optional parameter that is responsible for the behavior of the select when opening, if closeOnSelect: false,
   * then when an element is selected in the selector, closing does not occur,
   * and you can select another element by default, closeOnSelect:true.
   * @type {boolean}
   */
  closeOnSelect?: boolean;
  /**
   * An optional parameter that is responsible for the behavior of the select when opened on mobile devices.
   * @type {boolean}
   */
  nativeSelectMode?: boolean;
  /**
   * An optional parameter that is responsible for the behavior of the select when opening.
   * @type {boolean}
   */
  listDisplayMode?: boolean;
  /**
   * Optional parameter responsible for the localization of some text elements.
   * @type {string}
   */
  language?: string;
  /**
   * An optional parameter that adds a lable before the select.
   * @type {string}
   */
  lable?: string;
  /**
   * An optional parameter that is responsible for customizing the select elements,
   * objects with CSS properties for customizable elements are passed to it.
   * @type {IStyle}
   */
  styles?: IStyle;
  /**
   * An optional parameter that is responsible for the behavior of the select, passing to this parameter an event of the 'mouseenter' type,
   * select will open on hover.
   * @type {string}
   */
  event?: string;
  /**
   * Required parameter (if no other way to get data (items) is specified),
   * data that comes from the backend in the format { id: "", title: "", value: ""}.
   * @type {string}
   */
  url?: string;
  /**
   * An optional parameter, which is responsible for the behavior of the select, adds the ability to select multiple elements.
   * Selected elements are rendered as plain text, separated by commas.
   * @type {boolean}
   */
  multiselect?: boolean;
  /**
   * An optional parameter that is responsible for the behavior of the select,
   * for him, *** works only in a place with a multiselect connection.
   * @type {boolean}
   */
  multiselectTag?: boolean;
}

/**
 * @description Style Settings.
 */
export interface IStyle {
  /**
   * Select button customization.
   * @type {object}
   */
  head?: object;
  /**
   * Carriage customization.
   * @type {object}
   */
  caret?: object;
  /**
   * Customization placeholder.
   * @type {object}
   */
  placeholder?: object;
  /**
   * Lable select customization.
   * @type {object}
   */
  lable?: object;
  /**
   * Sheet customization with a selection of elements.
   * @type {object}
   */
  list?: object;
  /**
   * Search customization.
   * @type {object}
   */
  search?: object;
  /**
   * Chips customization with selected elements.
   * @type {object}
   */
  chips?: object;
}
