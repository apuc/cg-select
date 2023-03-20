import { CustomThemeJson } from 'components/theme/theme.interface';

export const newTheme: CustomThemeJson = {
  name: 'lol',
  styles: {
    head: {
      color: 'red',
      fontSize: '18px',
      background: '#ff000066',
    },
    lable: {
      color: 'black',
      fontSize: '26px',
    },
    list: {
      background: 'black',
      color: 'red',
    },
    placeholder: {
      color: 'green',
    },
    caret: {
      borderTop: '6px solid #607ab1',
    },
    search: {
      background: 'red',
    },
  },
};
