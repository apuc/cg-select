/**
 * Utils module
 * @module Utils
 */

/**
 * Создание кнопки выбора элементов
 * @param {HTMLElement} element созданный экземпляр класса DropDown
 * @param {string} content placeholer передаваемый из настроек селекта
 * @param {object} styles не обязательный параметр. Объект в котором находяться настройки кастомизации частей селекта
 */
export function createSelected(element, content, styles) {
  if (content) {
    element.innerHTML = `
      <div class="cg-select">
         <p class="selected">${content}</p>
          <div class="caret"></div>
       </div>
      `;
  }

  if (styles) {
    customStyles(element, styles);

    element.innerHTML = `
      <div class="cg-select" style = "${styles}">
          <p class="selected" style = "${styles}">${content}</p>
          <div class="caret" style = "${styles}"></div>
      </div>
    `;
  }
}

/**
 * Поиск и стилизация елементов полученных из styles экземпляра DropDown
 * @param {HTMLElement} element созданный экземпляр класса DropDown
 * @param {object} styles объект в котором находяться настройки кастомизации частей селекта
 */
export function customStyles(element, styles) {
  if (!styles) {
    return;
  }

  const { head, caret, placeholder, lable } = styles;

  const cgSelect = element.querySelector('.cg-select');
  const caretSelect = element.querySelector('.caret');
  const placeholderSelect = element.querySelector('.selected');
  const lableItem = element.parentElement.querySelector('h1.label');

  customStylesFormat(head, cgSelect);
  customStylesFormat(caret, caretSelect);
  customStylesFormat(lable, lableItem);

  if (placeholderSelect) {
    customStylesFormat(placeholder, placeholderSelect);
  }
}

/**
 * Универсальный метод для стилизации селекта
 * @param {object} elemOption объект полученное из объекта styles у которого мы получаем ключ-значение стилей
 * @param {HTMLElement} selector  HTMLElement подвергающиеся кастомизации
 */
export function customStylesFormat(elemOption, selector) {
  if (elemOption) {
    Object.entries(elemOption).forEach(([key, value]) => {
      selector.style[key] = value;
    });
  }
}

/**
 * Проверка содержит ли item  указанные свойства,
 * @param {object} item проверяемый на определенную структуру элемент
 * @returns {boolean} возвращает true/false если item содержит указанные свойства
 */
export function checkItemStruct(item) {
  if (item && typeof item !== 'object') {
    return false;
  }

  return item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value');
}

/**
 * Преобразование каждого елемента полученного из поля Items;
 * @param {object | string} dataItem полученный елемент переданный при создании селекта может быть как object/string
 * @param {number} index индекс этого элемента
 * @returns {object} возвращает сформированный объект
 */
export function getFormatItem(dataItem, index) {
  const random = Math.random().toString(36).substring(2, 10);
  let item = {};

  if (checkItemStruct(dataItem)) {
    item = {
      id: dataItem.id,
      title: dataItem.title,
      value: index,
    };
  } else {
    item = {
      id: random,
      title: dataItem,
      value: index,
    };
  }

  return item;
}

/**
 * Поведение нативного(одинарного) селекта при выборе кастомного
 * @param {NodeList} element NodeList нативного селекта
 * @param {object} item выбранный элемент в кастомном селекте
 */
export function nativOptionOrdinary(element, item) {
  element.forEach((option) => {
    option.removeAttribute('selected');
    if (option.textContent === item) {
      option.setAttribute('selected', 'selected');
    }
  });
}

/**
 * Поведение нативного(Multiple) селекта при выборе в кастомном
 * @param {NodeList} element NodeList нативного селекта
 * @param {object} item выбранный элемент в кастомном селекте
 * @param {boolean} condition специальный флаг при котором добавляются/убераются атрибуты у нативного селекта
 */
export function nativOptionMultiple(element, item, condition) {
  element.forEach((option) => {
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
