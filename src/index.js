import { DropDown } from './cg-dropdown';

// ------------------------------Обычный селект--------------------
const dropdown = new DropDown({
  selector: '.cg-dropdown_one',
  placeholder: 'Выберите авто',
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
  multiselectTag: true,
});

dropdown.deleteItem(2);

// ------------------------------URL--------------------
const dropdown3 = new DropDown({
  selector: '.cg-dropdown_three',
  placeholder: 'URL',
  url: 'http://jsonplaceholder.typicode.com/users',
  styles: {
    head: {
      background: 'black',
      width: '350px',
    },
  },
  multiselect: true,
  multiselectTag: true,
});

// --------------------------------Категории--------------------------
const dropdown4 = new DropDown({
  selector: '.cg-dropdown_button',
  placeholder: 'Выберите регион',
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
      background: 'red',
    },
    list: {
      background: 'green',
    },
    chips: {
      background: 'blue',
    },
  },
  multiselect: true,
  multiselectTag: true,
});

//----------------управление с помощью кнопок----------------------------------
/* const buttonOpen = document.querySelector('.button__open');
 const buttonClose = document.querySelector('.button__close');

 dropdown4.buttonControl(buttonOpen, 'open');
 dropdown4.buttonControl(buttonClose, 'close'); 
 */
