import { CGSelect } from '../src/cg-selectTS';

const dropdn = new CGSelect({
  selector: '.cg-dropdown_one',
  placeholder: 'Выберите авто',
  items: [
    {
      category: 'Russia',
      categoryItems: [
        {
          id: '28qwds',
          title: 'Москва',
          value: 0,
        },
        ,
        'Ростов-на-дону',
        'Саратов',
        'Волгоград',
        'Донецк',
      ],
    },
    {
      category: 'USA',
      categoryItems: ['Alabama', 'Texas', 'Colorado', 'Klirens', 'Los-Angeles'],
    },
    {
      category: 'France',
      categoryItems: ['Paris'],
    },
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
  multiselect: true,
  multiselectTag: true,
});
