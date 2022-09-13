const dropdown = new DropDown({
  selector: '.dropdown',
  selected: 'BMW',
  items: ['BMW', 'Opel', 'Mersedes', 'MAN', 'max'],
});

dropdown.on('click', function () {
  dropdown.open();
});

const dropdown2 = new DropDown({
  selector: '.dropdown2',
  selected: '1',
  amount: 7,
});

dropdown2.on('click', function () {
  dropdown2.open();
});
