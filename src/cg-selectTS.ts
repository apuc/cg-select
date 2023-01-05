import { IDataItem } from './components/utils/urils.interface';
import { createSelected, getFormatItem } from './components/utils/utilsTs';
import { ISgSelect } from './interfaces/cg-select.interface';
import { IItems } from './interfaces/items.interface';
import './main.scss';

export class SGSelect implements ISgSelect {
  selector: string;
  selected?: string;
  placeholder?: string;
  items?: IItems[] | string[] | any;
  darkTheme?: boolean;
  searchMode?: boolean;
  closeOnSelect?: boolean;
  nativeSelectMode?: boolean;
  listDisplayMode?: boolean;
  language?: string;
  lable?: string;
  styles?: object;
  event?: string;
  url?: string;
  multiselect?: boolean;
  multiselectTag?: boolean;

  private element: Element | null;
  private list: HTMLElement;
  private options: ISgSelect;
  private caret: HTMLElement;
  private category: string;
  private selectedItems: object[] | object;
  private itemsSelect: IItems[] | string[] | any;
  private indexes: number[] = [];

  constructor(setting: ISgSelect) {
    this.init(setting);
    this.render();
  }

  private init(setting: ISgSelect): void {
    const { items, multiselect, url, selector} = setting;

    this.options = setting;

    

    const elem = document.querySelector(selector);
    this.element = elem;

    this.element?.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('click');
      
    });

    this.itemsSelect = [];
    
    if(multiselect === true){
        this.selectedItems = [];
    }

    if (!items && url) {
        this.renderUrl();
        return;
    }

    items.forEach((dataItem:IDataItem, index:number) => {
        this.itemsSelect.push(getFormatItem(dataItem, index))
    })
  }

  private render() {
    const {
      styles,
      multiselect,
      searchMode,
      multiselectTag,
      darkTheme,
      language,
      nativeSelectMode,
      listDisplayMode,
    } = this.options;

    const random = Math.random().toString(36).substring(2, 10);

    this.initSelected()

  }

  private renderUrl() {}


  private initSelected(){
    const { styles, selected, placeholder, lable, language } = this.options;

    if (selected) {
      createSelected(this.element, selected);
    } else if (placeholder) {
      createSelected(this.element, placeholder);
    } else {
      // if (language && language === 'ru') {
      //   createSelected(this.#element, ru.selectPlaceholder);
      // } else {
      //   createSelected(this.#element, en.selectPlaceholder);
      // }
    }
  }
}
