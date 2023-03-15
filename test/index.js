import { CGSelect } from '../src/cg-select';
import { newTheme } from './test';

const dropdown = new CGSelect({
  selector: '.cg-dropdown_selector',
  placeholder: 'Выберите авто',
  items: [
    'BMW',
    {
      id: '213sade',
      title: 'Opel',
      value: 1,
    },
    'Mersedes',
    'MAN',
    'Ferari',
  ],
  multiselect: true,
  multiselectTag: true,
  theme: newTheme,
});
