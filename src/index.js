import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
  selector: '.cg-dropdown',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
});

const dropdown2 = new DropDown({
  selector: '.cg-dropdown2',
  placeholder: 'Выберите авто',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'Kamaz'],
  event: 'mouseenter',
  styleCustom: {
    select: 'selectCustom',
    caret: 'caretCustom',
    list: 'listCustom',
    item: 'listCustom__item',
  },
});

// const dropdown3 = new DropDown({
//   selector: '.cg-dropdown3',
//   selected: '',
//   items: [
//     {
//       title: 'Russia',
//       item: ['Rostov', 'Moskow'],
//     },
//     {
//       title: 'Germany',
//       item: ['Germany', 'Berlin'],
//     },
//   ],
// });
