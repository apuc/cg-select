import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
  selector: '.cg-dropdown',
  placeholder: 'Выберите авто',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
});

dropdown.addItem('ZAZ');

const dropdown2 = new DropDown({
  selector: '.cg-dropdown2',
  selected: '...',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'Kamaz'],
  event: 'mouseenter',
  styles: {
    head: {
      background: 'red',
      color: 'black',
      width: '400px',
    },
    placeholder: {
      color: 'grey',
    },
    caret: {
      'border-top': '6px solid black',
    },
    list: {
      background: 'red',
      color: 'black',
      width: '412px',
    },
  },
});

dropdown2.addItem('LADA');
dropdown2.selectIndex(3);

// dropdown2.deleteItemAll();

// dropdown2.deleteItem('MAN');

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
