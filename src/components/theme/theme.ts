import { CustomTheme } from './theme.interface';

export function changeTheme(element: Element, theme: string | CustomTheme) {
  const select = element!.querySelector('.cg-select');
  const caret = element!.querySelector('.caret');
  const list = element!.querySelector('ul.list');
  const search = element!.querySelector('.inputSearch');
  const path = element.querySelectorAll('.pathWhite');
  const nativeSelect = element.querySelector('.nativeSelect');

  select!.classList.remove('classicSelect');
  list!.classList.remove('classicList');
  path.forEach((elem) => {
    elem.classList.remove('pathBlack');
    elem.classList.remove('pathWhite');
  });

  if (typeof theme === 'string') {
    switch (theme) {
      case 'dark':
        select!.classList.add('selectDark');
        list!.classList.add('listDark');
        nativeSelect?.classList.add('listDark');
        path.forEach((elem) => {
          elem.classList.add('pathWhite');
        });
        break;
      case 'white':
        select!.classList.add('selectWhite');
        caret!.classList.add('caretWhite');
        list!.classList.add('listWhite');
        nativeSelect?.classList.add('listWhite');
        path.forEach((elem) => {
          elem.classList.add('pathBlack');
        });

        if (search!) {
          search!.classList.add('inputWhite');
        }
        break;

      default:
        select!.classList.add('classicSelect');
        list!.classList.add('classicList');
        break;
    }
  } else {
    select!.classList.add(`${theme.styles.head}`);
    list!.classList.add(`${theme.styles.list}`);
  }
}
