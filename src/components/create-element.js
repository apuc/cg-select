export function createBreadcrumb(data, title, index, id) {
  const { element, option, indexes, selectedItems } = data;
  const { placeholder } = option;

  const selected = element.querySelector('.selected');

  const li = document.createElement('li');
  const text = document.createTextNode(title);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  svg.setAttribute('viewBox', '0 0 10 10');
  path1.setAttribute('d', 'M3,7 L7,3');
  path2.setAttribute('d', 'M3,3 L7,7');
  li.setAttribute('id', `tag-${index}`);

  svg.classList.add('svg-icon');

  svg.appendChild(path1);
  svg.appendChild(path2);
  li.appendChild(text);
  li.appendChild(svg);

  svg.addEventListener('click', (event) => {
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

    li.parentElement.removeChild(li);
  });

  return li;
}
