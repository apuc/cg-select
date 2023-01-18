/**
 * Utils module
 * @module Utils
 */
import { IStyle } from 'interfaces/cg-select.interface';
import { IItems } from 'interfaces/items.interface';
import { ISelectedItems } from './urils.interface';

/**
 * Преобразование каждого елемента полученного из поля Items;
 * @param {any} dataItem полученный елемент переданный при создании селекта может быть как object / string
 * @param {number} index индекс этого элемента
 * @returns {IItems} возвращает сформированный объект
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
 * Вставка изначального текста селекта(до выбора)
 * @param {ITextSelect} data объект в котором находяться title селекта
 * @param {HTMLElement | null | undefined} select елемент селекта, куда будет вставляться title
 * @returns {HTMLElement} возвращает сформированный елемент селекта
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
 * Проверка содержит ли item  указанные свойства,
 * @param {object} item проверяемый на определенную структуру элемент
 * @returns {boolean} возвращает true/false если item содержит указанные свойства
 */
export function checkItemStruct(item: object): boolean {
  if (item && typeof item !== 'object') {
    return false;
  }

  return item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value');
}

/**
 * Создание кнопки выбора элементов
 * @param {HTMLElement} element созданный экземпляр класса DropDown
 * @param {string} content placeholer передаваемый из настроек селекта
 * @param {object} styles не обязательный параметр. Объект в котором находяться настройки кастомизации частей селекта
 */
export function createSelected(element: Element, content?: string, styles?: IStyle) {
  const select = document.createElement('div');
  const selected = document.createElement('p');
  const caret = document.createElement('div');

  select.classList.add('cg-select');
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
 * Создание кнопки отчиски селекта, при единичном выборе.
 * @param {HTMLElement} select место в селекте которое будет переназначено на ''.
 * @param {Element} element экземпляр класса DropDown.
 * @param {ISelectedItems} dataSelectText текст который отрисовывается в селекте.
 */
export function clearSelect(select: HTMLElement, element: Element, dataSelectText: ISelectedItems) {
  const { selectedItems, indexes, darkTheme, multiselectTag } = dataSelectText;

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

  if (darkTheme === true || !darkTheme) {
    path1.classList.add('pathWhite');
    path2.classList.add('pathWhite');
  }

  if (darkTheme === false) {
    path1.classList.add('pathBlack');
    path2.classList.add('pathBlack');
  }

  svgIcon.classList.add('svg-icon');
  svgIcon.classList.add('svg-clear');

  select!.appendChild(svgIcon);

  svgIcon.addEventListener('click', () => {
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
 * Поведение нативного(одинарного) селекта при выборе кастомного
 * @param {NodeList} element NodeList нативного селекта
 * @param {any} item выбранный элемент в кастомном селекте
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
 * Поведение нативного(Multiple) селекта при выборе в кастомном
 * @param {NodeListOf<Element> | undefined} element NodeList нативного селекта
 * @param {string} item выбранный элемент в кастомном селекте
 * @param {boolean} condition специальный флаг при котором добавляются/убераются атрибуты у нативного селекта
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
 * Поиск и стилизация елементов полученных из styles экземпляра DropDown
 * @param {Element} element созданный экземпляр класса DropDown
 * @param {object} styles объект в котором находяться настройки кастомизации частей селекта
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
 * Универсальный метод для стилизации селекта
 * @param {object} elemOption объект полученное из объекта styles у которого мы получаем ключ-значение стилей
 * @param {HTMLElement} selector  HTMLElement подвергающиеся кастомизации
 */
export function customStylesFormat(elemOption: object, selector: any) {
  if (elemOption) {
    Object.entries(elemOption).forEach(([key, value]) => {
      selector.style[key] = value;
    });
  }
}
