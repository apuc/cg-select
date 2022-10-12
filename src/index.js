import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
  selector: '.cg-dropdown_one',
  placeholder: 'Выберите авто',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
  styles: {
    head: {
      background: '#4d629f',
    },
  },
  multiselect: true,
  multiselectTag: true,
});

dropdown.addItem('ZAZ');
dropdown.addItem('LADA');
dropdown.addItem('Kamaz 258');
dropdown.addItem('BMW');

const dropdown2 = new DropDown({
  selector: '.cg-dropdown_two',
  placeholder: 'SELECT CAR',
  items: [
    {
      id: 'addaw21',
      title: 'BMW',
      value: 1,
    },
    {
      id: '2414q',
      title: 'Opel',
      value: 2,
    },
    {
      id: '24qwds',
      title: 'Kamaz 258',
      value: 3,
    },
    {
      id: '28wds',
      title: 'MAN',
      value: 4,
    },
    {
      id: '28qwds',
      title: 'BOOT',
      value: 5,
    },
  ],

  multiselect: true,
  event: 'mouseenter',
  // multiselectTag: true,
});

dropdown2.addItem('LADA');
dropdown.disabled(false);

//ToDo: paste the desired url;

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
