import {
  createNativeSelect,
  createNativeSelectOption,
} from './components/create-element/create-elementTs';
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
  private list: Element | null | undefined;
  private options: ISgSelect;
  private randomId: string;
  private caret: Element | null | undefined;
  private category: string;
  private selectedItems: object[] | object;
  private itemsSelect: IItems[] | string[] | any;
  private indexes: number[] = [];

  constructor(setting: ISgSelect) {
    this.init(setting);
    this.render();
  }

  /**
   * Приватный метод инициализации экземпляра класса DropDown
   * @method #init
   * @member
   * @protected
   * @param {ISgSelect} setting передаваемые настройки селекта
   * @description Приватный метод. Общая инициализация селекта. Получение настоек и преобразвание элементов селекта.
   * @example
   *  {
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
        darkTheme: true,
        multiselect: true,
        multiselectTag: true,
      }
   */
  private init(setting: ISgSelect): void {
    const { items, multiselect, url, selector } = setting;

    this.options = setting;

    const elem = document.querySelector(selector);
    this.element = elem;

    this.element?.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    this.itemsSelect = [];

    if (multiselect === true) {
      this.selectedItems = [];
    }

    if (!items && url) {
      this.renderUrl();
      return;
    }

    items.forEach((dataItem: any, index: number) => {
      let itemInputs: IDataItem = {
        ItemValue: dataItem,
      };

      this.itemsSelect.push(getFormatItem(itemInputs.ItemValue, index));
    });
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   *@protected
   * @method #render
   * @param {string} select  необязательный елемент. Передаеться в метод initSelected
   * @description Рендер елементов в селекте.
   */
  private render(select?: string): void {
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

    this.initSelected();

    const ulList = document.createElement('ul');
    const nativeSelect = createNativeSelect();

    let inputSearch: string = '';
    let textNode: Text;

    this.randomId = random;

    ulList.classList.add('list');

    this.element?.appendChild(ulList);

    this.itemsSelect.forEach((dataItem: IItems | any) => {
      this.element?.appendChild(nativeSelect);

      const liItem = document.createElement('li');
      const nativeOption = createNativeSelectOption();
      const strongItem = document.createElement('strong');

      liItem.classList.add('list__item');
      strongItem.classList.add('category');

      if (multiselect && multiselect === true) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);
        liItem.appendChild(checkBox);

        if (multiselectTag && multiselectTag == true) {
          checkBox.classList.add('displayHide');
        }

        nativeSelect.setAttribute('multiple', 'multiple');
      }

      if (dataItem.title) {
        nativeOption.text = dataItem.title;
        nativeOption.value = dataItem.title;
        textNode = document.createTextNode(dataItem.title);

        nativeSelect.appendChild(nativeOption);
        liItem.appendChild(textNode);
        ulList.appendChild(liItem);
      } else {
        // Для отрисовки категорий
        textNode = document.createTextNode(dataItem);
        strongItem.appendChild(textNode);
        ulList.appendChild(strongItem);
      }
    });

    this.list = this.element?.querySelector('.list');
    this.caret = this.element?.querySelector('.caret');

    // this.#addOptionsBehaviour();
  }

  private renderUrl() {}

  /**
   * Привaтный метод экземпляра класса DropDown
   *
   * @method #initSelected
   * @param {string} select необязательный елемент. Используется в методе selectIndex
   * @description Отрисовывает и стилизует селект
   * @protected
   */
  private initSelected(select?: string): void {
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

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} oneClick необязательный параметр передаваемый из функции buttonControl
   * @description Открывает список для выбора элемента
   * @method #open
   */
  private open(oneClick?: boolean): void {
    if (oneClick === true) {
      this.list?.classList.add('open');
      this.caret?.classList.add('caret_rotate');
    } else {
      this.list?.classList.toggle('open');
      this.caret?.classList.toggle('caret_rotate');
    }
  }

  private addOptionsBehaviour() {}
}
