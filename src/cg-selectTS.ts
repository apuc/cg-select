import {
  createBreadCrumb,
  createInputSearch,
  createNativeSelect,
  createNativeSelectOption,
} from './components/create-element/create-elementTs';
import { ICreateBreadCrumb } from './components/create-element/create-element.interface';

import {
  clearSelect,
  createSelected,
  customStyles,
  customStylesFormat,
  getFormatItem,
  getSelectText,
  nativeOptionMultiple,
  nativeOptionOrdinary,
} from './components/utils/utilsTs';
import { IDataItem, ISelectedItems } from './components/utils/urils.interface';

import { ICgSelect, IStyle } from './interfaces/cg-select.interface';
import { IItems } from './interfaces/items.interface';
import { ru, en } from './language/language';

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
  styles?: IStyle;
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
    this.initEvent();
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
        // category: dataItem.category,
        // categoryItems: dataItem.categoryItems,
      };

      if (dataItem.category && dataItem.categoryItems) {
        this.category = dataItem.category!;
        this.itemsSelect.push(this.category);
        dataItem.categoryItems.forEach((categoryItem, indexCategory) => {
          this.itemsSelect.push(getFormatItem(categoryItem, indexCategory));
        });
      } else {
        this.itemsSelect.push(getFormatItem(itemInputs.ItemValue, index));
      }
    });
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   * @protected
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

    if (select || (select && styles)) {
      this.initSelected(select);
      customStyles(this.element!, styles);
    } else {
      this.initSelected();
    }

    const ulList = document.createElement('ul');
    const nativeSelect = createNativeSelect();

    let inputSearch: HTMLInputElement;
    let textNode: Text;

    this.randomId = random;

    ulList.classList.add('list');

    if (styles) {
      const { list } = styles;
      customStylesFormat(list!, ulList);
    }

    if (searchMode) {
      if (language === 'ru') {
        inputSearch = createInputSearch(random, ru.placeholder);
      } else {
        inputSearch = createInputSearch(random, en.placeholder);
      }

      const { search } = styles!;
      customStylesFormat(search!, inputSearch);
      ulList.appendChild(inputSearch);
    }

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

    this.itemsSelect.filter((item, index) => {
      if (typeof item !== 'object') {
        this.itemsSelect.splice(index, 1);
      }
      return item;
    });

    this.list = this.element!.querySelector('.list');
    this.caret = this.element!.querySelector('.caret');

    if (darkTheme == false) {
      this.checkTheme();
    }

    if (nativeSelectMode === true) {
      this.selectMode(nativeSelectMode);
    }

    if (listDisplayMode) {
      this.displayMode(listDisplayMode);
    }

    this.addOptionsBehaviour();
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   * @protected
   * @method renderUrl
   * @description Рендер елементов в селекте переданных с URL и их настойка
   */
  private async renderUrl() {
    const { url, items, multiselect, multiselectTag } = this.options;

    if (items) {
      return;
    }

    if (!url) {
      return;
    }

    const response = await fetch(url);
    const dataUrl = await response.json();

    const nativeSelect = createNativeSelect();

    dataUrl.forEach((dataItem: IItems, index: number) => {
      const item = {
        id: dataItem.id,
        title: dataItem.title,
        value: index,
      };

      const ulUrl = this.element!.querySelector('.list');

      const nativeOption = createNativeSelectOption();
      const liUrl = document.createElement('li');
      const textUrl = document.createTextNode(item.title);

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        if (multiselectTag) {
          checkBox.classList.add('displayHide');
        }

        checkBox.setAttribute('id', `chbox-${item.id}`);
        nativeSelect.setAttribute('multiple', 'multiple');

        liUrl.appendChild(checkBox);
      }

      liUrl.classList.add('list__item');
      nativeOption.value = item.title;
      nativeOption.text = item.title;

      nativeSelect.appendChild(nativeOption);
      liUrl.appendChild(textUrl);
      ulUrl!.appendChild(liUrl);

      this.itemsSelect.push(item);
    });

    this.element!.appendChild(nativeSelect);

    this.itemsSelect.filter((item, index) => {
      if (typeof item !== 'object') {
        this.itemsSelect.splice(index, 1);
      }
      return item;
    });

    this.addOptionsBehaviour();
  }

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
      if (language && language === 'ru') {
        // createSelected(this.#element, ru.selectPlaceholder);
      } else {
        // createSelected(this.#element, en.selectPlaceholder);
      }
    }

    if (select) {
      createSelected(this.element, select, styles);
    }

    if (lable) {
      const lableItem = document.createElement('h1');
      const textLable = document.createTextNode(lable);

      lableItem.appendChild(textLable);
      lableItem.classList.add('label');

      this.element!.insertAdjacentElement('beforebegin', lableItem);
    }

    if (styles) {
      customStyles(this.element!, styles);
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Открывает и закрывает список по переданному эвенту
   * @method initEvent
   */
  private initEvent() {
    const { event } = this.options;
    if (!event) {
      return;
    }

    if (event) {
      if (event === 'mouseenter') {
        this.element!.addEventListener(event, () => {
          this.open();
        });
        this.element!.addEventListener('mouseleave', () => {
          this.close();
        });
      }
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
   * @method close
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
    const nativeOption = this.element!.querySelectorAll('.nativeSelect__nativeOption');

    let selectedItemsClear: ISelectedItems;

    const ulMultipul = document.createElement('ul');

    if (multiselect) {
      this.selectedItems = [];
      ulMultipul.classList.add('multiselect-tag');
      select?.classList.add('overflow-hidden');
    }

    if (searchMode) {
      this.searchModeSelect(this.randomId);
    }

    options?.forEach((option: Element, index: number) => {
      option.addEventListener('click', (event) => {
        if (Array.isArray(this.selectedItems)) {
          selectedItemsClear = {
            placeholder: placeholder!,
            selected: selected!,
            selectedItems: this.selectedItems,
            indexes: this.indexes,
            darkTheme: darkTheme,
            multiselectTag: multiselectTag,
          };
        }

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

              if (multiselectTag) {
                if (Array.isArray(this.selectedItems)) {
                  const dataBreadCrumb: ICreateBreadCrumb = {
                    option: this.options,
                    element: this.element,
                    indexes: this.indexes,
                    selectedItems: this.selectedItems,
                  };

                  this.selectedItems.push(item.title);
                  select!.appendChild(ulMultipul);
                  ulMultipul.appendChild(
                    createBreadCrumb(dataBreadCrumb, item.title, index, item.id),
                  );
                }
              } else {
                if (Array.isArray(this.selectedItems)) {
                  this.selectedItems.push(item.title);
                  select!.innerText = this.selectedItems.join(',');
                }
              }
            } else {
              if (multiselectTag) {
                const tagItem = document.getElementById(`tag-${index}-${item.id}`);
                ulMultipul.removeChild<Element>(tagItem!);
              }

              if (Array.isArray(this.selectedItems)) {
                this.selectedItems.splice(checkIndex, 1);
                this.indexes.splice(checkIndex, 1);
                nativeOptionMultiple(nativeOption, item.title, false);
              }
            }

            if (!this.selectedItems.length) {
              getSelectText(selectedItemsClear, select);
            } else {
              if (multiselectTag) {
                select!.appendChild(ulMultipul);
              } else {
                if (Array.isArray(this.selectedItems)) {
                  select!.innerText = this.selectedItems.join(',');
                }
              }
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

        clearSelect(select!, this.element!, selectedItemsClear);
      });
    });
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   * @protected
   * @method #checkTheme
   * @description Изменяет цветовую схему с темной на светлую.
   */
  private checkTheme(): void {
    const { darkTheme, searchMode } = this.options;

    const select = this.element!.querySelector('.cg-select');
    const caret = this.element!.querySelector('.caret');
    const list = this.element!.querySelector('ul.list');
    const search = this.element!.querySelector('.inputSearch');

    if (darkTheme == false) {
      select!.classList.add('selectWhite');
      caret!.classList.add('caretWhite');
      list!.classList.add('listWhite');

      if (searchMode == true) {
        search!.classList.add('inputWhite');
      }
    } else if (darkTheme == true || !darkTheme) {
      return;
    } else {
      throw new Error('Styles error or invalid value entered!');
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} nativeSelectMode параметр отвечающий за добавления нативного селекта.
   * @description Изменяет отображение селекта на мобильных устройствах
   * @method selectMode
   */
  private selectMode(nativeSelectMode: boolean) {
    let win = window.outerWidth;

    if (nativeSelectMode === true) {
      const select = this.element!.querySelector('.cg-select');
      const list = this.element!.querySelector('.list');
      const nativeSelect = this.element!.querySelector('.nativeSelect');

      if (win < 576) {
        select!.classList.add('displayHide');
        list!.classList.add('displayHide');
        nativeSelect!.classList.add('nativeSelectActive');
      } else if (win > 576) {
        select!.classList.remove('displayHide');
        list!.classList.remove('displayHide');
        nativeSelect!.classList.remove('nativeSelectActive');
        nativeSelect!.classList.add('displayHide');
      }
    } else {
      return;
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} listDisplayMode параметр отвечающий за отображение выбора в виде модального окна.
   * @description Изменяет отображение листа с выбором в виде модального окна.
   * @method displayMode
   */
  private displayMode(listDisplayMode: boolean): void {
    if (listDisplayMode) {
      const modal = document.createElement('div');
      const body = document.querySelector('body');
      const list = this.list!;

      modal.appendChild(list);
      this.element!.appendChild(modal);

      this.element!.addEventListener('click', () => {
        modal.classList.toggle('modal');
        list.classList.toggle('listModal');
        body!.classList.toggle('overflowHide');
      });
    } else {
      return;
    }
  }

  /**
   * Метод который реализует поиск элементов в селекте
   * @protected
   * @param {string} random уникальное значение для input элемента.
   * @method searchMode
   */
  private searchModeSelect(random: string) {
    const { language } = this.options;

    const input = this.element!.querySelector(`#searchSelect-${random}`) as HTMLInputElement;
    const searchSelect = this.element!.querySelectorAll('.list__item');
    const result = document.createElement('p');

    let textNode: Text;
    if (language && language === 'ru') {
      textNode = document.createTextNode(`${ru.textInListSearch}`);
    } else {
      textNode = document.createTextNode(`${en.textInListSearch}`);
    }

    result.appendChild(textNode);
    result.classList.add('displayHide');
    result.classList.add('noRezult');
    input!.parentElement!.appendChild(result);

    input!.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    if (input instanceof HTMLInputElement) {
      input!.oninput = function () {
        let valueSearch: string = input.value.trim().toLowerCase();
        let anyMatch = false;

        if (valueSearch != '') {
          searchSelect.forEach((elem) => {
            let isMatching = new RegExp(valueSearch, 'gi').test(elem.textContent!);
            anyMatch = anyMatch || isMatching;

            if (elem.textContent!.toLowerCase().search(valueSearch) == -1) {
              elem.classList.add('displayHide');
            } else {
              elem.classList.remove('displayHide');
            }
          });

          result.classList.toggle('displayHide', anyMatch);
        } else {
          searchSelect.forEach((elem) => {
            elem.classList.remove('displayHide');
            result.classList.add('displayHide');
          });
        }
      };
    }
  }
}
