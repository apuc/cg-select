import { CGSelect } from '../../../src/cg-select';

const body = new CGSelect({
  selector: '.body',
  placeholder: 'Select element to style',
  items: ['head', 'list', 'placeholder', 'caret', 'search', 'chips', 'lable'],
});

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
    head: {},
    placeholder: {},
    list: {},
    caret: {},
    chips: {},
    search: {},
    lable: {},
  },
});

let valueSelect = '';

body.on('select', (e, value) => {
  valueSelect = value;
  getValueSelect(valueSelect);
});

function getValueSelect(value) {
  switch (value) {
    case 'head':
      console.log('lol');
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

let textarea = document.querySelector('#styles');

textarea.onkeyup = function () {
  console.log(textarea.value);
};
