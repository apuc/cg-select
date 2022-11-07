import { DropDown } from './cg-dropdown';

// ------------------------------Обычный селект--------------------
const dropdown = new DropDown({
  selector: '.cg-dropdown_one',
  placeholder: 'Выберите авто',
  lable: 'Выбор лучшего авто!',
  darkTheme: false,
  searchMode: true,
  closeOnSelect: false,
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
    'Ferari',
    'Ferari',
  ],
  styles: {
    lable: {
      fontSize: '14px',
      border: '1px white solid',
      borderRadius: '5px',
    },
  },
  // multiselect: true,
  // multiselectTag: true,
});

const ger = {
  placeholder: 'searcH????',
  textInListSearch: 'None',
};

dropdown.addLenguage(ger);

// ------------------------------URL--------------------
const dropdown3 = new DropDown({
  selector: '.cg-dropdown_three',
  placeholder: 'URL',
  url: 'http://jsonplaceholder.typicode.com/users',
  searchMode: true,
  lenguage: 'ru',
  styles: {
    head: {
      background: 'black',
      width: '350px',
    },
  },
  // multiselect: true,
  // multiselectTag: true,
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
  // styles: {
  //   head: {
  //     background: 'red',
  //   },
  //   list: {
  //     background: 'green',
  //   },
  //   chips: {
  //     background: 'blue',
  //   },
  // },
  multiselect: true,
  multiselectTag: true,
});

//----------------управление с помощью кнопок----------------------------------
const dropdownBtn = new DropDown({
  selector: '.cg-dropdown_usedBtn',
  placeholder: 'Выберите авто',
  searchMode: true,
  darkTheme: true,
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
