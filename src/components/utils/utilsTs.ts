import { ICgSelect } from '../../interfaces/cg-select.interface';
import { IItems } from '../../interfaces/items.interface';
import { IDataItem, ITextSelect } from './urils.interface';

/**
 * Преобразование каждого елемента полученного из поля Items;
 * @param {IDataItem} dataItem полученный елемент переданный при создании селекта может быть как object / string
 * @param {number} index индекс этого элемента
 * @returns {IDataItem | IItems} возвращает сформированный объект
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
  data: ITextSelect,
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
export function createSelected(element: Element | null, content?: string, styles?: object) {
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
    element?.appendChild(select);
  } else if (styles) {
    // customStyles(element, styles);
    select.setAttribute('style', `${styles}`);
    selected.setAttribute('style', `${styles}`);
    caret.setAttribute('style', `${styles}`);
  }

  // if (styles) {
  //   customStyles(element, styles);

  //   element.innerHTML = `
  //     <div class="cg-select" style = "${styles}">
  //         <p class="selected" style = "${styles}">${content}</p>
  //         <div class="caret" style = "${styles}"></div>
  //     </div>
  //   `;
  // }
}

/**
 * Поведение нативного(одинарного) селекта при выборе кастомного
 * @param {NodeList} element NodeList нативного селекта
 * @param {any} item выбранный элемент в кастомном селекте
 */
export function nativeOptionOrdinary(element: NodeListOf<Element> | undefined, item: any) {
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
