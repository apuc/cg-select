export interface CustomTheme {
  name: string;
  styles: {
    head?: string;
    list?: string;
    placeholder?: string;
    caret?: string;
    search?: string;
    chips?: string;
    lable?: string;
  };
}

export interface CustomThemeJson {
  name: string;
  styles: {
    head?: {};
    list?: {};
    placeholder?: {};
    caret?: {};
    search?: {};
    chips?: {};
    lable?: {};
  };
}
