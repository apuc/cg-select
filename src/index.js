import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
  selector: '.cg-dropdown',
  placeholder: 'Выберите авто',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
  styles: {
    head: {
      background: 'red',
    },
  },
  multiselect: true,
  multiselectTag: true,
});

dropdown.addItem('ZAZ');
dropdown.addItem('LADA');
// dropdown.addItem('BMW');

const dropdown2 = new DropDown({
  selector: '.cg-dropdown2',
  placeholder: 'SELECT CAR',
  items: [
    {
      id: 'addaw21',
      title: 'BMW',
      value: '1',
    },
    {
      id: '2414q',
      title: 'Opel',
      value: '2',
    },
    {
      id: '24qwds',
      title: 'Kamaz 258',
      value: '3',
    },
    {
      id: '28wds',
      title: 'MAN',
      value: '4',
    },
    {
      id: '28qwds',
      title: 'BOOT',
      value: '5',
    },
  ],

  multiselect: true,
  multiselectTag: true,
});

//ToDo: paste the desired url;

const dropdown3 = new DropDown({
  selector: '.cg-dropdown3',
  placeholder: 'URL',
  url: 'http://jsonplaceholder.typicode.com/users',
  multiselect: true,
  multiselectTag: true,
});
