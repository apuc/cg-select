import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
  selector: '.cg-dropdown',
  selected: 'BMW',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
});

const dropdown2 = new DropDown({
  selector: '.cg-dropdown2',
  selected: 'Opel',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
  event: 'mouseenter',
});

dropdown;
