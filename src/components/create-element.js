import { customStylesFormat } from './utils';

export function createBreadcrumb(data, title, index, id) {
  const { element, option, indexes, selectedItems } = data;
  const { placeholder, styles } = option;
  const { chips } = styles;

  const selected = element.querySelector('.selected');
  const liChip = document.createElement('li');
  const textNode = document.createTextNode(title);
  const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  svgIcon.setAttribute('viewBox', '0 0 10 10');
  path1.setAttribute('d', 'M3,7 L7,3');
  path2.setAttribute('d', 'M3,3 L7,7');
  liChip.setAttribute('id', `tag-${index}`);

  svgIcon.classList.add('svg-icon');

  svgIcon.appendChild(path1);
  svgIcon.appendChild(path2);
  liChip.appendChild(textNode);
  liChip.appendChild(svgIcon);

  customStylesFormat(chips, liChip);

  svgIcon.addEventListener('click', (event) => {
    event.stopPropagation();

    const deleteIcon = indexes.indexOf(index);

    indexes.splice(deleteIcon, 1);
    selectedItems.splice(deleteIcon, 1);

    let checkBox = '';

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
