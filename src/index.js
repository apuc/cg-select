const dropdown = new DropDown({
  selector: '.dropdown',
  selected: 'BMW',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
});

const dropdown2 = new DropDown({
  selector: '.dropdown2',
  selected: 'Opel',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
  event: 'mouseenter',
});
