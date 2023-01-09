import { nativeOptionMultiple } from '../utils/utilsTs';
import { ICreateBreadCrumb } from './create-element.interface';

/**
 * Метод который создает нативный селект
 * @returns {HTMLSelectElement} Возвращает созданный нативный селект
 */
export function createNativeSelect(): HTMLSelectElement {
  const nativeSelect = document.createElement('select');

  nativeSelect.setAttribute('name', 'dataSelect');
  nativeSelect.classList.add('nativeSelect');
  return nativeSelect;
}

/**
 * Метод который создает Options для нативного селекта
 * @returns {HTMLOptionElement} Возвращает созданные Options нативного селекта
 */
export function createNativeSelectOption(): HTMLOptionElement {
  const nativeOption = document.createElement('option');

  nativeOption.classList.add('nativeSelect__nativeOption');
  return nativeOption;
}

/**
 * Метод который создает и отвечает за поведение chips
 * @param {ICreateBreadCrumb} data объект в котором содержатся настройки и элементы селекта
 * @param {string} title имя выбранного элемента для отрисовки chips
 * @param {number} index индекс выбранного элемента для отрисовки chips
 * @param {string} id уникальное id выбранного элемента
 * @returns {HTMLElement} возвращает сформированный HTMLElement chips item
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
    // const { chips } = styles;
    //   customStylesFormat(chips, liChip);
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
