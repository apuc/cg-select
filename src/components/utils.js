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
 * Вставка изначального текста селекта(до выбора)
 * @param {object} data объект в котором находяться title селекта
 * @param {HTMLElement} select елемент селекта, куда будет вставляться title
 * @returns {HTMLElement} возвращает сформированный елемент селекта
 */
export function getSelectText(data, select) {
  const { placeholder, selected } = data;

  if (placeholder) {
    select.innerText = placeholder;
  } else if (selected) {
    select.innerText = selected;
  } else {
    select.innerText = 'Select...';
  }
  return select;
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

/**
 * Создание кнопки отчиски селекта, при единичном выборе.
 * @param {HTMLElement} select место в селекте которое будет переназначено на ''.
 * @param {HTMLElement} element экземпляр класса DropDown.
 * @param {object} dataSelectText текст который отрисовывается в селекте.
 */
export function clearSelect(select, element, dataSelectText) {
  const { selectedItems, indexes, darkTheme, multiselectTag } = dataSelectText;

  const options = element.querySelectorAll('.list__item');
  const ulMultiSelect = element.querySelector('.multiselect-tag');
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

  select.appendChild(svgIcon);

  svgIcon.addEventListener('click', () => {
    select.innerText = '';

    if (Array.isArray(selectedItems)) {
      selectedItems.splice(0);
      indexes.splice(0);
    }

    checkBox.forEach((item) => {
      item.checked = false;
    });

    getSelectText(dataSelectText, select);

    options.forEach((option) => {
      option.classList.remove('active');
    });
  });
}
