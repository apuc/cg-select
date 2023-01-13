import { CGSelect } from '../src/cg-selectTS';

const dropdn = new CGSelect({
  selector: '.cg-dropdown_one',
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
    'max',
  ],
  styles: {
    head: {
      width: '830px',
    },
    list: {
      width: '824px',
    },
    placeholder: {
      maxWidth: '500px ',
    },
  },
  // url
  // listDisplayMode: true,
  // searchMode: true,
  // nativeSelectMode: true
  // event: 'mouseenter',
  // buttonControl
  multiselect: true,
  multiselectTag: true,
});
