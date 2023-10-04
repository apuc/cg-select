import { customStylesFormat, nativeOptionMultiple } from '../utils/utils';
import { ICreateBreadCrumb } from './create-element.interface';

/**
 * The method that creates the native select.
 * @returns {HTMLSelectElement} Returns the created native select.
 */
export function createNativeSelect(nameSelect: string | undefined): HTMLSelectElement {
  const nativeSelect = document.createElement('select');

  if (nameSelect == undefined) {
    nativeSelect.setAttribute('name', 'CgSelect');
  } else {
    nativeSelect.setAttribute('name', nameSelect!);
  }
  nativeSelect.classList.add('nativeSelect');
  return nativeSelect;
}

/**
 * The method that creates Options for the native select.
 * @returns {HTMLOptionElement} Returns the generated Options of the native select.
 */
export function createNativeSelectOption(): HTMLOptionElement {
  const nativeOption = document.createElement('option');

  nativeOption.classList.add('nativeSelect__nativeOption');
  return nativeOption;
}

/**
 * The method that creates and is responsible for the behavior of the chips.
 * @param {ICreateBreadCrumb} data an object that contains settings and select elements.
 * @param {string} title the name of the selected element to draw chips.
 * @param {number} index index of the selected item to draw chips.
 * @param {string} id unique id of the selected element.
 * @returns {HTMLElement} returns the generated HTMLElement chips item.
 */
export function createBreadCrumb(
  data: ICreateBreadCrumb,
  title: string,
  index: number,
  id: string,
): HTMLLIElement {
  const { element, option, indexes, selectedItems } = data;
  const { placeholder, styles } = option;

  const selected: HTMLElement | null | undefined = element?.querySelector('.selected');
  const nativeOption = element!.querySelectorAll('.nativeSelect__nativeOption');

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
    customStylesFormat(chips!, liChip);
  }

  svgIcon.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    nativeOptionMultiple(nativeOption, title, false);

    const deleteIcon = indexes.indexOf(index);
    let checkBox: any;

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
      selected!.innerText = placeholder!;
    }

    liChip.parentElement!.removeChild(liChip);
  });

  return liChip;
}

/**
 * The method that creates a search for elements in the select.
 * @param {string} random unique value for input element.
 * @param {string} lenguage text in specific language passed from language.ts file
 * @returns {HTMLInputElement} Returns the rendered input element.
 */
export function createInputSearch(random: string, lenguage: string): HTMLInputElement {
  const inputSearch = document.createElement('input');

  inputSearch.type = 'text';
  inputSearch.classList.add('inputSearch');
  inputSearch.setAttribute('id', `searchSelect-${random}`);

  if (lenguage) {
    inputSearch.setAttribute('placeholder', `${lenguage}`);
  } else {
    inputSearch.setAttribute('placeholder', 'Search...');
  }

  inputSearch.addEventListener('click', (e) => {
    e.preventDefault();
  });

  return inputSearch;
}
