import { CGSelect } from '../../../src/cg-select';

const body = new CGSelect({
  selector: '.body',
  placeholder: 'Select element to style',
  items: ['head', 'list', 'placeholder', 'caret', 'search', 'chips', 'lable'],
});

let head = '';
let list = '';
let placeholder = '';
let caret = '';
let chips = '';
let lable = '';
let valueSelect = '';

const textarea = document.querySelector('#styles');
const renderBtn = document.querySelector('.render');
const saveStyleBtn = document.querySelector('.saveStyle');

body.on('select', (e, value) => {
  valueSelect = value;
  getValueSelect(valueSelect);
});

function getValueSelect(value) {
  switch (value) {
    case 'head':
      // ввод стилей
      // background: red;
      textarea.onkeyup = function () {
        console.log(textarea.value);
        head = textarea.value;
      };
      break;
    case 'list':
      break;
    case 'placeholder':
      break;
    case 'caret':
      break;
    case 'search':
      break;
    case 'chips':
      break;
    case 'lable':
      break;

    default:
      break;
  }
}

// Рендер селекта со стилями
renderBtn.addEventListener('click', () => {
  // debugger;
  // let HEAD = {
  //   key[0]: key[1]
  // };

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
    styles: {
      head: {
        background: head,
      },
      placeholder: {},
      list: {},
      caret: {},
      chips: {},
      search: {},
      lable: {},
    },
  });
});
