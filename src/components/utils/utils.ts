/**
 * Utils module
 * @module Utils
 */
import { IStyle } from 'interfaces/cg-select.interface';
import { IItems } from 'interfaces/items.interface';
import { ISelectedItems } from './urils.interface';

/**
 * Converting each item obtained from the Items field;
 * @param {any} dataItem received element passed when creating the select.
 * @param {number} index index of this element.
 * @returns {IItems} returns the formed object
 */
export function getFormatItem(dataItem: any, index: number): IItems {
  const random = Math.random().toString(36).substring(2, 10);
  let item: IItems;

  if (checkItemStruct(dataItem)) {
    return dataItem;
  } else {
    item = {
      id: random,
      title: dataItem,
      value: index,
    };

    return item;
  }
}

/**
 * Insert initial select text (before selection)
 * @param {ITextSelect} data the object in which the title of the select is located.
 * @param {HTMLElement | null | undefined} select select element where title will be inserted.
 * @returns {HTMLElement} returns the generated select element.
 */
export function getSelectText(
  data: ISelectedItems,
  select: HTMLElement | null | undefined,
): HTMLElement {
  const { placeholder, selected } = data;

  if (placeholder) {
    select!.innerText = placeholder;
  } else if (selected) {
    select!.innerText = selected;
  } else {
    select!.innerText = 'Select...';
  }

  return select!;
}

/**
 * Checking if item contains the specified properties.
 * @param {object} item element to be checked against a certain structure.
 * @returns {boolean} returns true/false if item contains the specified properties.
 */
export function checkItemStruct(item: object): boolean {
  if (item && typeof item !== 'object') {
    return false;
  }

  return item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value');
}

/**
 * Creating an Item Selector Button.
 * @param {HTMLElement} element instantiated class CgSelect.
 * @param {string} content placeholer passed from select settings.
 * @param {object} styles optional parameter. The object in which the settings for customizing parts of the select are located.
 */
export function createSelected(element: Element, content?: string, styles?: IStyle) {
  const select = document.createElement('div');
  const selected = document.createElement('p');
  const caret = document.createElement('div');

  select.classList.add('cg-select');
  select.classList.add('classicSelect');
  selected.classList.add('selected');
  caret.classList.add('caret');

  select.appendChild(selected);
  select.appendChild(caret);

  if (content) {
    const text = document.createTextNode(content);
    selected.appendChild(text);
    element.innerHTML = '';
    element?.insertAdjacentElement('afterbegin', select);
  } else if (styles) {
    customStyles(element!, styles);
    select.setAttribute('style', `${styles}`);
    selected.setAttribute('style', `${styles}`);
    caret.setAttribute('style', `${styles}`);
  }
}

/**
 * Creating a clear select button, with a single selection.
 * @param {HTMLElement} select place in the select that will be reassigned to ''.
 * @param {Element} element class instance CgSelect.
 * @param {ISelectedItems} dataSelectText the text that is rendered in the select.
 */
export function clearSelect(select: HTMLElement, element: Element, dataSelectText: ISelectedItems) {
  const { selectedItems, indexes, theme, multiselectTag } = dataSelectText;

  const options = element.querySelectorAll('.list__item');
  const nativeOption = element!.querySelectorAll('.nativeSelect__nativeOption');
  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const checkBox = element.querySelectorAll('li input');

  svgIcon.setAttribute('viewBox', '0 0 10 10');
  path1.setAttribute('d', 'M2,8 L8,2');
  path2.setAttribute('d', 'M2,2 L8,8');
  svgIcon.appendChild(path1);
  svgIcon.appendChild(path2);

  if (multiselectTag && multiselectTag == true) {
    return;
  }

  switch (theme) {
    case 'dark':
      path1.classList.add('pathWhite');
      path2.classList.add('pathWhite');
      break;
    case 'white':
      path1.classList.add('pathBlack');
      path2.classList.add('pathBlack');
      break;
    default:
      path1.classList.add('pathWhite');
      path2.classList.add('pathWhite');
      break;
  }

  svgIcon.classList.add('svg-icon');
  svgIcon.classList.add('svg-clear');

  select!.appendChild(svgIcon);

  svgIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    select!.innerText = '';

    nativeOption.forEach((option) => {
      option.removeAttribute('selected');
    });

    if (Array.isArray(selectedItems)) {
      selectedItems!.splice(0);
      indexes!.splice(0);
    }

    checkBox.forEach((item) => {
      if (item instanceof HTMLInputElement) {
        item.checked = false;
      }
    });

    getSelectText(dataSelectText, select);

    options.forEach((option) => {
      option.classList.remove('active');
    });
  });
}

/**
 * Behavior of a native (single) select when choosing a custom one.
 * @param {NodeList} element NodeList native select.
 * @param {any} item selected element in custom select.
 */
export function nativeOptionOrdinary(element: NodeListOf<Element> | undefined, item: string) {
  element!.forEach((option) => {
    option.removeAttribute('selected');
    if (option.textContent === item) {
      option.setAttribute('selected', 'selected');
    }
  });
}

/**
 * The behavior of the native (Multiple) select when choosing in a custom one.
 * @param {NodeListOf<Element> | undefined} element NodeList of native select.
 * @param {string} item selected element in custom select.
 * @param {boolean} condition a special flag that adds / removes attributes from the native select.
 */
export function nativeOptionMultiple(
  element: NodeListOf<Element> | undefined,
  item: string,
  condition: boolean,
) {
  element!.forEach((option) => {
    if (condition == true) {
      if (option.textContent === item) {
        option.setAttribute('selected', 'selected');
      }
    } else if (condition == false) {
      if (option.textContent === item) {
        option.removeAttribute('selected');
      }
    } else {
      return;
    }
  });
}

/**
 * Finding and styling elements derived from the styles instance CgSelect
 * @param {Element} element instantiated class CgSelect.
 * @param {object} styles object in which there are settings for customizing parts of the select.
 */
export function customStyles(element: Element, styles: IStyle) {
  const cgSelect = element.querySelector('.cg-select');
  const caretSelect = element.querySelector('.caret');
  const placeholderSelect = element.querySelector('.selected');
  const lableItem = element.parentElement!.querySelector('h1.label');

  customStylesFormat(styles.head!, cgSelect!);
  customStylesFormat(styles.caret!, caretSelect!);
  customStylesFormat(styles.lable!, lableItem!);

  if (placeholderSelect) {
    customStylesFormat(styles.placeholder!, placeholderSelect);
  }
}

/**
 * Generic Method for Styling a Select.
 * @param {object} elemOption an object obtained from the styles object from which we get the styles key-value.
 * @param {HTMLElement} selector  HTMLElement subject to customization.
 */
export function customStylesFormat(elemOption: object, selector: any) {
  if (elemOption) {
    Object.entries(elemOption).forEach(([key, value]) => {
      selector.style[key] = value;
    });
  }
}
