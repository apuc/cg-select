// Создание селектора
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
          <span class="selected" style = "${styles}">${content}</span>
          <div class="caret" style = "${styles}"></div>
      </div>
    `;
  }
}

// Метод ищет и стилизует полученные елементы из styles
export function customStyles(element, styles) {
  if (!styles) {
    return;
  }

  const { head, caret, placeholder } = styles;

  const cgSelect = element.querySelector('.cg-select');
  const caretSelect = element.querySelector('.caret');
  const placeholderSelect = element.querySelector('.selected');

  customStylesFormat(head, cgSelect);

  customStylesFormat(caret, caretSelect);

  if (placeholderSelect) {
    customStylesFormat(placeholder, placeholderSelect);
  }
}

// Метод checkItemStruct возвращает true/false если item содержит указанные свойства,
export function checkItemStruct(item) {
  if (item && typeof item !== 'object') {
    return false;
  }

  return item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value');
}

// Метод getFormatItem преобразовывает каждый елемент полученный из поля Items;
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

// Универсальный метод для стилизации селекта
export function customStylesFormat(elemOption, selector) {
  if (elemOption) {
    Object.entries(elemOption).forEach(([key, value]) => {
      selector.style[key] = value;
    });
  }
}
