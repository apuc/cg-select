import { CGSelect } from '../../../src/cg-select';

const body = new CGSelect({
  selector: '.body',
  placeholder: 'Select element to style',
  items: ['head', 'list', 'placeholder', 'caret', 'search', 'chips'],
});

let head = '';
let list = '';
let placeholder = '';
let caret = '';
let chips = '';
let valueSelect = '';

const textarea = document.querySelector('#styles');
const renderBtn = document.querySelector('.render');
const saveStyleBtn = document.querySelector('.saveStyle');

body.on('select', (e, value) => {
  valueSelect = value;
  textarea.value = '';
  textarea.removeAttribute('disabled');
  getValueSelect(valueSelect);
});

function getValueSelect(value) {
  textarea.onkeyup = function () {
    switch (value) {
      case 'head':
        // ввод стилей
        head = textarea.value;
        break;
      case 'list':
        list = textarea.value;
        break;
      case 'placeholder':
        placeholder = textarea.value;
        break;
      case 'caret':
        caret = textarea.value;
        break;
      case 'search':
        search = textarea.value;
        break;
      case 'chips':
        chips = textarea.value;
        break;

      default:
        break;
    }
  };
}

renderBtn.addEventListener('click', () => {
  const select = new CGSelect({
    selector: '.select',
    placeholder: 'Choose a car',
    items: [
      'BMW',
      {
        id: '213sade',
        title: 'Opel',
        value: 1,
      },
      'Mersedes',
      'MAN',
      'Ferari',
    ],
    searchMode: true,
  });

  const drop = document.querySelector('.select');
  let headSelect = drop.querySelector('.cg-select');
  let listSelect = drop.querySelector('.list');
  let placeholderSelect = drop.querySelector('.selected');
  let caretSelect = drop.querySelector('.caret');
  let searchSelect = drop.querySelector('.inputSearch');
  headSelect.setAttribute('style', head);
  listSelect.setAttribute('style', list);
  placeholderSelect.setAttribute('style', placeholder);
  caretSelect.setAttribute('style', caret);
  searchSelect.setAttribute('style', search);
});
