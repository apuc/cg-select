export function changeTheme(element: Element, theme: string) {
  const select = element!.querySelector('.cg-select');
  const caret = element!.querySelector('.caret');
  const list = element!.querySelector('ul.list');
  const search = element!.querySelector('.inputSearch');
  const path = element.querySelectorAll('.pathWhite');

  select!.classList.remove('classicSelect');
  list!.classList.remove('classicList');
  path.forEach((elem) => {
    elem.classList.remove('pathBlack');
    elem.classList.remove('pathWhite');
  });

  switch (theme) {
    case 'dark':
      select!.classList.add('selectDark');
      list!.classList.add('listDark');
      path.forEach((elem) => {
        elem.classList.add('pathWhite');
      });
      break;
    case 'white':
      select!.classList.add('selectWhite');
      caret!.classList.add('caretWhite');
      list!.classList.add('listWhite');
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
}
