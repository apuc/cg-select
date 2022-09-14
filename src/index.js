const dropdown = new DropDown({
  selector: '.dropdown',
  selected: 'BMW',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
});

const dropdown2 = new DropDown({
  selector: '.dropdown2',
  selected: 'BMW',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
  targetEvent: 'mouseover',
});

// dropdown.on('click', function () {
//   dropdown.open();
// });
