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
  private options: object;
  private caret: HTMLElement;
  private category: string;
  private selectedItems: object[] | object;
  private itemsSelect: IItems[] | string[] | any;
  private indexes: number[] = [];

  constructor(setting: ISgSelect) {
    this.init(setting);
  }

  private init(setting: ISgSelect): void {
    const { items, multiselect, url, selector} = setting;
    this.options = setting;

    const elem = document.querySelector(selector);
    this.element = elem;

    this.element?.addEventListener('click', (e) => {
      e.preventDefault();
    });

    this.itemsSelect = [];
    
    if(multiselect === true){
        this.selectedItems = [];
    }

    if (!items && url) {
        this.renderUrl();
        return;
    }

    items.forEach((dataItem, index) => {
        this.itemsSelect.push()
    })
  }

  private render() {}
  private renderUrl() {}
}
