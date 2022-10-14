import { DropDown } from './cg-dropdown';

// const dropdown = new DropDown({
//   selector: '.cg-dropdown_one',
//   placeholder: 'Выберите авто',
//   items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],

//   multiselect: true,
//   multiselectTag: true,
// });

// // dropdown.addItem('ZAZ');
// dropdown.addItem('LADA');
// dropdown.addItem('Kamaz 258');
// // dropdown.addItem('BMW');
// // const dropdown2 = new DropDown({
// //   selector: '.cg-dropdown_two',
// //   placeholder: 'SELECT CAR',
// //   items: [
// //     {
// //       id: 'addaw21',
// //       title: 'BMW',
// //       value: 1,
// //     },
// //     {
// //       id: '2414q',
// //       title: 'Opel',
// //       value: 2,
// //     },
// //     {
// //       id: '24qwds',
// //       title: 'Kamaz 258',
// //       value: 3,
// //     },
// //     {
// //       id: '28wds',
// //       title: 'MAN',
// //       value: 4,
// //     },
// //     {
// //       id: '28qwds',
// //       title: 'BOOT',
// //       value: 5,
// //     },
// //   ],

// //   multiselect: true,
// //   event: 'mouseenter',
// //   // multiselectTag: true,
// // });

// dropdown.disabled(false);

// dropdown2.addItem('LADA');

// //ToDo: paste the desired url;

// const dropdown3 = new DropDown({
//   selector: '.cg-dropdown_three',
//   placeholder: 'URL',
//   url: 'http://jsonplaceholder.typicode.com/users',
//   styles: {
//     head: {
//       background: 'black',
//       width: '350px',
//     },
//   },
//   multiselect: true,
//   multiselectTag: true,
// });

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

  multiselect: true,
  multiselectTag: true,
});

// dropdown4.addItem('Харьков');
// dropdown4.deleteItemAll();
// dropdown4.selectIndex(5);

// const buttonOpen = document.querySelector('.button__open');
// const buttonClose = document.querySelector('.button__close');

// dropdown4.buttonControl(buttonOpen, 'open');
// dropdown4.buttonControl(buttonClose, 'close');
