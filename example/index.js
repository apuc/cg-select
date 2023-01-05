import DropDown from '../index';
import './example';

// ------------------------------Обычный селект--------------------
// const dropdown = new DropDown({
//   selector: '.cg-dropdown_one',
//   placeholder: 'Выберите авто',
//   lable: 'EXAMPLE',
//   items: [
//     'BMW',
//     {
//       id: '213sade',
//       title: 'Opel',
//       value: 1,
//     },
//     'Mersedes',
//     'MAN',
//     'Ferari',
//   ],
//   styles: {
//     head: {
//       width: '830px',
//     },
//     list: {
//       width: '824px',
//     },
//   },
// });

// ------------------------------NativeSelect-----------------------
const dropdownNativeSelect = new DropDown({
  selector: '.cg-dropdown_selectNative',
  placeholder: 'Выберите авто',
  nativeSelectMode: true,
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
    'Kamaz',
    'Ural'
  ],
  styles: {
    head: {
      width: '830px',
    },
    list: {
      width: '824px',
    },
  },
});

// ------------------------------listDisplayMode--------------------
const dropdownlistDisplayMode = new DropDown({
  selector: '.cg-dropdown_listDisplayMode',
  placeholder: 'Выберите авто',
  listDisplayMode: true,
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
      width: '830px',
    },
    list: {
      width: '824px',
    },
  },
});

// ------------------------------URL--------------------
const dropdown3 = new DropDown({
  selector: '.cg-dropdown_three',
  placeholder: 'URL',
  url: 'https://jsonplaceholder.typicode.com/users',
  searchMode: true,
  darkTheme: false,
  language: 'ru',
  styles: {
    head: {
      width: '830px',
    },
    list: {
      width: '824px',
    },
  },
});

// --------------------------------Категории--------------------------
const dropdown4 = new DropDown({
  selector: '.cg-dropdown_categories',
  placeholder: 'Выберите регион',
  searchMode: true,
  items: [
    {
      category: 'Russia',
      categoryItems: [
        {
          id: '28qwds',
          title: 'Москва',
          value: 0,
        },
        ,
        'Ростов-на-дону',
        'Саратов',
        'Волгоград',
        'Донецк',
      ],
    },
    {
      category: 'USA',
      categoryItems: ['Alabama', 'Texas', 'Colorado', 'Klirens', 'Los-Angeles'],
    },
    {
      category: 'France',
      categoryItems: ['Paris'],
    },
  ],
  styles: {
    head: {
      width: '830px',
    },
    list: {
      width: '824px',
    },
    placeholder: {
      maxWidth: '500px ',
    },
  },
  multiselect: true,
  multiselectTag: true,
});

//----------------управление с помощью кнопок----------------------------------
const dropdownBtn = new DropDown({
  selector: '.cg-dropdown_usedBtn',
  placeholder: 'Выберите авто',
  searchMode: true,
  items: [
    'BMW',
    {
      id: '213sade',
      title: 'Opel',
      value: 1,
    },
    'Mersedes',
    'MAN',
    'max',
  ],
  styles: {
    head: {
      width: '830px',
      color: 'black',
      backgroundColor: 'rgb(176 223 167)',
    },
    list: {
      width: '824px',
      color: 'black',
      backgroundColor: 'rgb(176 223 167)',
    },
    caret: {
      borderTop: '6px solid black',
    },
    search: {
      backgroundColor: '#d7ffff',
      borderRadius: '5px',
      borderBottom: 'none',
      width: '95%',
      color: 'black',
    },
  },
  multiselect: true,
});

const buttonOpen = document.querySelector('.button__open');
const buttonClose = document.querySelector('.button__close');

dropdownBtn.buttonControl(buttonOpen, 'open');
dropdownBtn.buttonControl(buttonClose, 'close');

//-------------------------Функция Disabled----------------------------------
const dropdownDisabled = new DropDown({
  selector: '.cg-dropdown_checkboxDisable',
  placeholder: 'Выберите авто',
  searchMode: true,
  items: [
    'BMW',
    {
      id: '213sade',
      title: 'Opel',
      value: 1,
    },
    'Mersedes',
    'MAN',
    'max',
  ],
  styles: {
    head: {
      width: '830px',
    },
    list: {
      width: '824px',
    },
    placeholder: {
      maxWidth: '500px ',
    },
  },
  multiselect: true,
});
dropdownDisabled.disabled(true);
let chbox = document.getElementById('checkboxDisable');

chbox.addEventListener('click', () => {
  if (chbox.checked == true) {
    dropdownDisabled.disabled(false);
  } else {
    dropdownDisabled.disabled(true);
  }
});
