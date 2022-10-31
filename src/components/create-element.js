import { customStylesFormat, nativOptionMultiple } from './utils';
/**
 * @module createBreadcrumb
 */

/**
 * Метод который создает и отвечает за поведение chips
 * @param {object} data объект в котором содержатся настройки и элементы селекта
 * @param {string} title имя выбранного элемента для отрисовки chips
 * @param {number} index индекс выбранного элемента для отрисовки chips
 * @param {string} id уникальное id выбранного элемента
 * @returns {HTMLElement} возвращает сформированный HTMLElement chips item
 */
export function createBreadcrumb(data, title, index, id) {
  const { element, option, indexes, selectedItems } = data;
  const { placeholder, styles } = option;

  const selected = element.querySelector('.selected');
  const nativOption = element.querySelectorAll('.nativSelect__nativOption');

  const liChip = document.createElement('li');
  const textNode = document.createTextNode(title);
  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  svgIcon.setAttribute('viewBox', '0 0 10 10');
  path1.setAttribute('d', 'M3,7 L7,3');
  path2.setAttribute('d', 'M3,3 L7,7');
  liChip.setAttribute('id', `tag-${index}-${id}`);

  svgIcon.classList.add('svg-icon');

  svgIcon.appendChild(path1);
  svgIcon.appendChild(path2);
  liChip.appendChild(textNode);
  liChip.appendChild(svgIcon);

  if (styles) {
    const { chips } = styles;
    customStylesFormat(chips, liChip);
  }

  svgIcon.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    nativOptionMultiple(nativOption, title, false);

    const deleteIcon = indexes.indexOf(index);
    let checkBox = '';

    indexes.splice(deleteIcon, 1);
    selectedItems.splice(deleteIcon, 1);

    if (id) {
      checkBox = document.getElementById(`chbox-${id}`);
    } else {
      checkBox = document.getElementById(`chbox-${index}`);
    }

    checkBox.checked = false;
    checkBox.parentElement.classList.remove('active');

    if (!selectedItems.length) {
      selected.innerText = placeholder;
    }

    liChip.parentElement.removeChild(liChip);
  });

  return liChip;
}

/**
 * Метод который создает нативный селект
 * @returns {HTMLSelectElement} Возвращает созданный нативный селект
 */
export function createNativeSelect() {
  const nativSelect = document.createElement('select');

  nativSelect.setAttribute('name', 'dataSelect');
  nativSelect.classList.add('nativSelect');
  return nativSelect;
}

/**
 * Метод который создает Options для нативного селекта
 * @returns {HTMLOptionElement} Возвращает созданные Options нативного селекта
 */
export function createNativSelectOption() {
  const nativOption = document.createElement('option');

  nativOption.classList.add('nativSelect__nativOption');
  return nativOption;
}

/**
 * Метод который создает поиск элементов в селекте
 * @param {string} random уникальное значение для input элемента.
 * @returns {HTMLInputElement} Возвращает сформированный input елемент.
 */
export function createInputSearch(random) {
  const intputSearch = document.createElement('input');

  intputSearch.type = 'text';
  intputSearch.classList.add('inputSearch');
  intputSearch.setAttribute('id', `searchSelect-${random}`);
  intputSearch.setAttribute('placeholder', 'Search...');

  return intputSearch;
}
