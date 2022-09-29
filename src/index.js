import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
  selector: '.cg-dropdown',
  placeholder: 'Выберите авто',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
  multiselect: true,
});

dropdown.addItem('ZAZ');
dropdown.addItem('LADA');

const dropdown2 = new DropDown({
  selector: '.cg-dropdown2',
  placeholder: 'SELECT CAR',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'Kamaz'],
});
// let a = dropdown2.getValue();
// console.log(a);
//ToDo: paste the desired url;

const dropdown3 = new DropDown({
  selector: '.cg-dropdown3',
  placeholder: 'URL',
  url: 'http://jsonplaceholder.typicode.com/users',
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
