import { SGSelect } from "../src/cg-selectTS";

const dropdn = new SGSelect({
    selector: '.cg-dropdown_one',
    placeholder: 'Выберите авто',
    // lable: 'EXAMPLE',
    items: [
      'BMW',
      {
        id: '213sade',
        title: 'Opel',
        value: 'ds',
      },
      'Mersedes',
      'MAN',
      'Ferari',
    ]
})