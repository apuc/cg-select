import { customStylesFormat } from '../utils/utils';
import { CustomTheme, CustomThemeJson } from './theme.interface';

export function changeTheme(element: Element, theme: string | CustomTheme | CustomThemeJson) {
  const select = element!.querySelector('.cg-select');
  const caret = element!.querySelector('.caret');
  const list = element!.querySelector('ul.list');
  const search = element!.querySelector('.inputSearch');
  const placeholder = element!.querySelector('.selected');
  // const chips = element!.querySelector('.multiselect-tag');
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
    if (theme.name!) {
      let customThemeHead = theme.styles.head! as object;
      let customThemeList = theme.styles.list! as object;
      let customThemeCaret = theme.styles.caret! as object;
      let customThemeChips = theme.styles.chips! as object;
      let customThemePl = theme.styles.placeholder! as object;
      let customThemeSearch = theme.styles.search! as object;
      // let customThemeLable = theme.styles.lable! as object;

      customStylesFormat(customThemeHead, select!);
      customStylesFormat(customThemeList, list!);
      customStylesFormat(customThemeCaret, caret!);
      // customStylesFormat(customThemeChips, select!);
      customStylesFormat(customThemePl, placeholder!);
      customStylesFormat(customThemeSearch, search!);
      // customStylesFormat(customThemeLable, select!);
    } else {
      select!.classList.add(`${theme.styles.head}`);
      list!.classList.add(`${theme.styles.list}`);
    }
  }
}
