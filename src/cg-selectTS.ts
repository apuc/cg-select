import {
  createNativeSelect,
  createNativeSelectOption,
} from './components/create-element/create-elementTs';
import { IDataItem, ITextSelect } from './components/utils/urils.interface';
import {
  createSelected,
  getFormatItem,
  getSelectText,
  nativeOptionMultiple,
  nativeOptionOrdinary,
} from './components/utils/utilsTs';
import { ICgSelect } from './interfaces/cg-select.interface';
import { IItems } from './interfaces/items.interface';
import './main.scss';

export class CGSelect implements ICgSelect {
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
  private options: ICgSelect;
  private randomId: string;
  private caret: Element | null | undefined;
  private category: string;
  private selectedItems: string[] | string;
  private itemsSelect: IItems[] | string[] | any;
  private indexes: number[] = [];

  constructor(setting: ICgSelect) {
    this.init(setting);
    this.render();
    this.closeSelectClick();
  }

  /**
   * Приватный метод инициализации экземпляра класса DropDown
   * @method init
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
  private init(setting: ICgSelect): void {
    const { items, multiselect, url, selector } = setting;

    this.options = setting;

    const elem = document.querySelector(selector);
    this.element = elem;

    this.element?.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    this.itemsSelect = [];

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
   * @method render
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

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);
        liItem.appendChild(checkBox);

        if (multiselectTag) {
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

    this.addOptionsBehaviour();
  }

  private renderUrl() {}

  /**
   * Привaтный метод экземпляра класса DropDown
   *
   * @method initSelected
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
   * @method open
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

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Закрывает список
   * @method #close
   */
  private close(): void {
    this.list?.classList.remove('open');
    this.caret?.classList.remove('caret_rotate');
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Закрывает список по клику вне элемента
   * @method closeSelectClick
   */
  private closeSelectClick(): void {
    const dropdown = document.querySelector(`${this.options.selector}`);

    document.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(dropdown!);
      if (!withinBoundaries) {
        // if (this.btn) {
        //   return;
        // } else {
        //   this.#close();
        // }
        this.close();
      }
    });
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Метод реализовывающий выбор элементов в разных режимах. Обычный/Мультиселект/Мультиселект + Мультиселект Таг.
   * @method addOptionsBehaviour
   */
  private addOptionsBehaviour() {
    const {
      multiselect,
      placeholder,
      selected,
      multiselectTag,
      searchMode,
      closeOnSelect,
      darkTheme,
    } = this.options;

    const options = this.element?.querySelectorAll('.list__item');
    const select: HTMLElement | null | undefined = this.element?.querySelector('.selected');
    const nativeOption = this.element?.querySelectorAll('.nativeSelect__nativeOption');

    const placeholderTextSelect: ITextSelect = {
      placeholder: placeholder,
      selected: selected,
    };

    const ulMultipul = document.createElement('ul');

    if (multiselect) {
      this.selectedItems = [];
      ulMultipul.classList.add('multiselect-tag');
      select?.classList.add('overflow-hidden');
    }

    options?.forEach((option: Element, index: number) => {
      option.addEventListener('click', (event) => {
        const item: IItems = this.itemsSelect[index];

        const checkIndex = this.indexes.indexOf(index);

        if (closeOnSelect == false || multiselect) {
          event.stopPropagation();
          event.preventDefault();
        }

        if (multiselect) {
          option.classList.toggle('active');

          const checkBox: HTMLInputElement | null = option.querySelector('input[type="checkbox"]');

          if (checkBox) {
            if (!(event.target instanceof HTMLInputElement)) {
              checkBox.checked = !checkBox.checked;
            }

            if (checkIndex == -1) {
              this.indexes.push(index);
              nativeOptionMultiple(nativeOption, item.title, true);
              select!.textContent = '';

              if (Array.isArray(this.selectedItems)) {
                this.selectedItems.push(item.title);
                select!.innerText = this.selectedItems.join(',');
              }
            } else {
              this.indexes.splice(checkIndex, 1);
              nativeOptionMultiple(nativeOption, item.title, false);

              if (Array.isArray(this.selectedItems)) {
                this.selectedItems.splice(checkIndex, 1);
                select!.innerText = this.selectedItems.join(',');
              }
            }

            if (Array.isArray(this.selectedItems) && !this.selectedItems.length) {
              getSelectText(placeholderTextSelect, select);
            }
          }
        } else {
          select!.textContent = item.title;
          this.selectedItems = item.title;

          nativeOptionOrdinary(nativeOption, item.title);

          options.forEach((option) => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        }

        // if (multiselect) {
        //   this.selectedItems = [];
        //   option.classList.toggle('active');
        //   const checkBox: HTMLInputElement | null = option.querySelector('input[type="checkbox"]');

        //   if (checkBox) {
        //     if (!(event.target instanceof HTMLInputElement)) {
        //       checkBox.checked = !checkBox.checked;
        //     }

        //     if (checkIndex === -1) {
        //       nativeOptionMultiple(nativeOption, item.title, true);
        //       this.indexes.push(index);
        //       select!.textContent = '';

        //       if (multiselectTag) {
        //         this.selectedItems.push(item);
        //         select!.appendChild(ulMultipul);

        //         const data = {
        //           option: this.options,
        //           element: this.element,
        //           indexes: this.indexes,
        //           selectedItems: this.selectedItems,
        //         };

        //         ulMultipul.appendChild(createBreadcrumb(data, item.title, index, item.id));
        //       } else {
        //         debugger;
        //         this.selectedItems.push(item.title);
        //         console.log(this.selectedItems);

        //         select.innerText = this.selectedItems;
        //       }
        //     } else {
        //       if (multiselectTag) {
        //         const tagItem = document.getElementById(`tag-${index}-${item.id}`);
        //         ulMultipul.removeChild(tagItem);
        //       }

        //       this.indexes.splice(checkIndex, 1);
        //       this.selectedItems.splice(checkIndex, 1);
        //       nativeOptionMultiple(nativeOption, item.title, false);
        //     }

        //     if (!this.#selectedItems.length) {
        //       getSelectText(dataSelectText, select);
        //     } else {
        //       if (multiselectTag) {
        //         select.appendChild(ulMultipul);
        //       } else {
        //         select.innerText = this.#selectedItems;
        //       }
        //     }
        //   }
      });
    });
  }
}
