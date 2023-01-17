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
import { ru, en } from './language/languageTS';
import { ILanguage } from './interfaces/language.interface';

import './main.scss';

/**
 * @class Описание класса ICgSelect
 * @description Этот класс реализовывает функционал кастомного селекта, с возможностями кастомизации.
 * @author Овсяников Максим
 */
export class CGSelect implements ICgSelect {
  // Настройки селекта
  selector?: string;
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

  // Переменные и комплектующие селекта

  /**
   * Созданный HTML елемент
   * @type {Element | null}
   */
  private element!: Element | null;
  /**
   * Созданный список(ul), с классом list
   * @type {Element | null | undefined}
   */
  private list!: Element | null;
  /**
   * Настройки селекта передаваемые при создании экземпляра класса
   * @type {ICgSelect}
   */
  private options!: ICgSelect;
  /**
   * Уникальный Id для елементов
   * @type {string}
   */
  private randomId!: string;
  /**
   * Переменная для управления каретки
   * @type {Element | null | undefined}
   */
  private caret: Element | null | undefined;
  /**
   * Переданные категории
   * @type {string}
   */
  private category?: string;
  /**
   * Выбранный или массив выбранных элементов из списка
   * @type {string[] | string}
   */
  private selectedItems!: string[] | string;
  /**
   * Массив индексов выбранных элементов
   * @type {number[]}
   */
  private indexes: number[] = [];
  /**
   * Кнопка, для управления селектом
   * @type {Element | null}
   */
  private btnCntr?: Element | null;

  /**
   * @param {ICgSelect} setting Объект принимающий настройки селекта
   * @constructor Конструктор класса DropDown
   * @description  Конструктор принимает объект и рендерит селект.
   * @example
   * options = {
   *  selector: 'Уникальный селектор',
      selected: 'Выбранный элемент',
      placeholder: '...',
      lable: '...'
      items: [string|number|object],
      darkTheme: true/false,
      searchMode: true/false,
      closeOnSelect:  true/false,
      nativeSelectMode: true/false,
      listDisplayMode: true/false,
      language: 'ru/en',
      styles: {
        head: {
          background: '...',
        },
        list: {...},
        chips: {...},
        caret: {...},
        placeholder: {...},
        lable: {..},
      },
      event: '...',
      url: 'http/...',
      multiselect: true/false,
      multiselectTag: true/false,
   * } 
   */
  constructor(setting: ICgSelect) {
    this.init(setting);
    this.render();
    this.closeSelectClick();
    this.initEvent();
  }

  //Getters
  /**
   * Метод экземпляра класса DropDown
   * @returns {string[] | string} Возвращает выбранные элемент(ы) в виде массива/элемента/null
   * @description Геттер возвращающий выбранные элемент(ы) селекта
   */
  get value(): string | string[] {
    return this.selectedItems ?? null;
  }

  /**
   * Метод экземпляра класса DropDown
   * @returns {number | number[]}Возвращает индексы выбранных элемента(ов) в виде массива/пустой массив
   * @description Геттер возвращающий индексы выбранных элемента(ов) селекта
   */
  get indexesOf(): number | number[] {
    return this.indexes ?? [];
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
    const {
      items,
      multiselect,
      multiselectTag,
      url,
      selector,
      listDisplayMode,
      nativeSelectMode,
      searchMode,
      darkTheme,
      language,
      styles,
      lable,
      event,
      selected,
      placeholder,
    } = setting;

    this.options = setting;

    this.multiselect = multiselect;
    this.multiselectTag = multiselectTag;
    this.url = url;
    this.selector = selector;
    this.items = items;
    this.searchMode = searchMode;
    this.darkTheme = darkTheme;
    this.language = language;
    this.nativeSelectMode = nativeSelectMode;
    this.listDisplayMode = listDisplayMode;
    this.styles = styles;
    this.lable = lable;
    this.event = event;
    this.selected = selected;
    this.placeholder = placeholder;

    const elem = document.querySelector(this.selector!);
    this.element = elem;

    this.element?.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    this.items = [];

    if (this.url && !items) {
      this.renderUrl();
      return;
    }

    createSelected;

    items.forEach((dataItem: any, index: number) => {
      let itemInputs: IDataItem = {
        ItemValue: dataItem,
        category: dataItem.category,
        categoryItems: dataItem.categoryItems,
      };

      if (itemInputs.category && itemInputs.categoryItems) {
        this.category = itemInputs.category!;
        this.items.push(this.category);
        itemInputs.categoryItems.forEach(
          (categoryItem: string | IItems | any, indexCategory: number) => {
            this.items.push(getFormatItem(categoryItem, indexCategory));
          },
        );
      } else {
        this.items.push(getFormatItem(itemInputs.ItemValue, index));
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
    const random = Math.random().toString(36).substring(2, 10);

    if (select || (select && this.styles)) {
      this.initSelected(select);
      customStyles(this.element!, this.styles!);
    } else {
      this.initSelected();
    }

    const ulList = document.createElement('ul');
    const nativeSelect = createNativeSelect();

    let inputSearch: HTMLInputElement;
    let textNode: Text;

    this.randomId = random;

    ulList.classList.add('list');

    if (this.styles) {
      customStylesFormat(this.styles.list!, ulList);
    }

    if (this.searchMode) {
      if (this.language === 'ru') {
        inputSearch = createInputSearch(random, ru.placeholder);
      } else {
        inputSearch = createInputSearch(random, en.placeholder);
      }

      customStylesFormat(this.styles?.search!, inputSearch);
      ulList.appendChild(inputSearch);
    }

    this.element?.appendChild(ulList);

    this.items.forEach((dataItem: IItems | any) => {
      this.element?.appendChild(nativeSelect);

      const liItem = document.createElement('li');
      const nativeOption = createNativeSelectOption();
      const strongItem = document.createElement('strong');

      liItem.classList.add('list__item');
      strongItem.classList.add('category');

      if (this.multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);
        liItem.appendChild(checkBox);

        if (this.multiselectTag) {
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

    this.items.filter((item: IItems | any, index: number) => {
      if (typeof item !== 'object') {
        this.items.splice(index, 1);
      }

      return item;
    });

    this.list = this.element!.querySelector('.list');
    this.caret = this.element!.querySelector('.caret');

    if (this.darkTheme == false) {
      this.checkTheme();
    }

    if (this.nativeSelectMode === true) {
      this.selectMode(this.nativeSelectMode);
    }

    if (this.listDisplayMode) {
      this.displayMode(this.listDisplayMode);
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
    const response = await fetch(this.url!);
    const dataUrl = await response.json();
    console.log(dataUrl);

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

      if (this.multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        if (this.multiselectTag) {
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

      this.items.push(item);
    });

    this.element!.appendChild(nativeSelect);

    this.items.filter((item: IItems | string | any, index: number) => {
      if (typeof item !== 'object') {
        this.items.splice(index, 1);
      }
      return item;
    });

    this.addOptionsBehaviour();
  }

  /**
   * Привaтный метод экземпляра класса DropDown
   * @method initSelected
   * @param {string} select необязательный елемент. Используется в методе selectIndex
   * @description Отрисовывает и стилизует селект
   * @protected
   */
  private initSelected(select?: string): void {
    if (this.selected) {
      createSelected(this.element!, this.selected);
    } else if (this.placeholder) {
      createSelected(this.element!, this.placeholder);
    } else {
      if (this.language && this.language === 'ru') {
        createSelected(this.element!, ru.selectPlaceholder);
      } else {
        createSelected(this.element!, en.selectPlaceholder);
      }
    }

    if (select) {
      createSelected(this.element!, select, this.styles);
    }

    if (this.lable) {
      const lableItem = document.createElement('h1');
      const textLable = document.createTextNode(this.lable);

      lableItem.appendChild(textLable);
      lableItem.classList.add('label');

      this.element!.insertAdjacentElement('beforebegin', lableItem);
    }

    if (this.styles) {
      customStyles(this.element!, this.styles);
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Открывает и закрывает список по переданному эвенту
   * @method initEvent
   */
  private initEvent() {
    if (!this.event) {
      return;
    }

    if (this.event) {
      if (this.event === 'mouseenter') {
        this.element!.addEventListener(this.event, () => {
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
      this.list!.classList.add('open');
      this.caret!.classList.add('caret_rotate');
    } else {
      this.list!.classList.toggle('open');
      this.caret!.classList.toggle('caret_rotate');
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
        if (this.btnCntr) {
          return;
        } else {
          this.close();
        }
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
    const options = this.element?.querySelectorAll('.list__item');
    const select: HTMLElement | null | undefined = this.element?.querySelector('.selected');
    const nativeOption = this.element!.querySelectorAll('.nativeSelect__nativeOption');

    let selectedItemsClear: ISelectedItems = {
      placeholder: this.placeholder!,
      selected: this.selected!,
    };

    const ulMultipul = document.createElement('ul');

    if (this.multiselect) {
      this.selectedItems = [];
      ulMultipul.classList.add('multiselect-tag');
      select?.classList.add('overflow-hidden');
    }

    if (this.searchMode) {
      this.searchModeSelect(this.randomId);
    }

    options?.forEach((option: Element, index: number) => {
      option.addEventListener('click', (event) => {
        if (Array.isArray(this.selectedItems)) {
          selectedItemsClear = {
            placeholder: this.placeholder!,
            selected: this.selected!,
            selectedItems: this.selectedItems,
            indexes: this.indexes,
            darkTheme: this.darkTheme,
            multiselectTag: this.multiselectTag,
          };
        }

        const item: IItems = this.items[index];

        const checkIndex = this.indexes.indexOf(index);

        if (this.closeOnSelect == false || this.multiselect) {
          event.stopPropagation();
          event.preventDefault();
        }

        if (this.multiselect) {
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

              if (this.multiselectTag) {
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
              if (this.multiselectTag) {
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
              if (this.multiselectTag) {
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
    const select = this.element!.querySelector('.cg-select');
    const caret = this.element!.querySelector('.caret');
    const list = this.element!.querySelector('ul.list');
    const search = this.element!.querySelector('.inputSearch');

    if (this.darkTheme == false) {
      select!.classList.add('selectWhite');
      caret!.classList.add('caretWhite');
      list!.classList.add('listWhite');

      if (this.searchMode == true) {
        search!.classList.add('inputWhite');
      }
    } else if (this.darkTheme == true) {
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
   * Метод который реализует поиск элементов в селекте
   * @protected
   * @param {string} random уникальное значение для input элемента.
   * @method searchMode
   */
  private searchModeSelect(random: string) {
    const input = this.element!.querySelector(`#searchSelect-${random}`) as HTMLInputElement;
    const searchSelect = this.element!.querySelectorAll('.list__item');
    const result = document.createElement('p');

    let textNode: Text;
    if (this.language && this.language === 'ru') {
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

  // Public methods
  /**
   * Метод экземпляра класса DropDown
   * @param {number} numberItem номер возвращаемого элемента
   * @returns {HTMLElement} возвращает ссылку на выбранный HTML элемент
   * @method getElement
   */
  public getElement(numberItem: number): IItems[] | string[] | any {
    if (numberItem > this.items.length) {
      return;
    }

    return this.items[numberItem];
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {object} language объект в котором находятся поля для подключения языка имеет два обязательных поля placeholder, textInListSearch
   * @description метод позволяющий заменить плейсхолдер в поиске и текст который выводится если нет результата
   * @method addLanguage
   */
  public addLanguage(language: ILanguage) {
    const { placeholder, textInListSearch, selectPlaceholder } = language;

    const select = this.element!.querySelector('.selected');
    const textNodeSelect = document.createTextNode(selectPlaceholder);
    select!.appendChild(textNodeSelect);

    if (this.searchMode) {
      const search = this.element!.querySelector('.inputSearch');
      const textNoRezult = this.element!.querySelector('.noRezult');
      const textNode = document.createTextNode(textInListSearch);

      search!.setAttribute('placeholder', placeholder);
      search!.setAttribute('placeholder', placeholder);

      textNoRezult!.textContent = '';
      textNoRezult!.appendChild(textNode);
    }
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {HTMLInputElement} button - HTML кнопка
   * @param {string} method - метод открытия open/close
   * @description Метод позволяющий открывать/закрывать селект с помощью кнопок
   * @method buttonControl
   */
  public buttonControl(button: Element, method: string) {
    if (this.listDisplayMode) {
      return;
    }

    this.btnCntr = button!;
    button.addEventListener('click', () => {
      if (method.toLowerCase() === 'open') {
        this.open(true);
      } else if (method.toLowerCase() === 'close') {
        this.close();
      } else {
        return;
      }
    });
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {boolean} value - Передаваемый параметр для добавления атрибута disabled;
   * @description Метод позволяющий переключать состояние селекта disabled,
   * @method disabled
   */
  public disabled(value: boolean) {
    const select = this.element!.querySelector('.cg-select');
    const nativeSelect = this.element!.querySelector('.nativeSelect');

    if (value === true) {
      this.element!.setAttribute('disabled', 'true');
      nativeSelect!.setAttribute('disabled', 'true');
      select!.classList.add('disabled');
    } else {
      this.element!.removeAttribute('disabled');
      nativeSelect!.removeAttribute('disabled');
      select!.classList.remove('disabled');
    }
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {string | object} item добавляемый елемент
   * @description добавляет переданный элемент в конец списка и перерисовывает список. Не может использоваться при передачи элементов с категорями
   * @method addItem
   */
  public addItem(item: IItems | string | number) {
    if (this.category) {
      console.log('can`t add item to category');
      return;
    }

    if (!item) {
      return false;
    }

    const index = this.items.length;

    this.items.push(getFormatItem(item, index));
    this.render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} index индекс удаляемого элемента
   * @description удаляет елемент по индексу из списка и перерисовывает его. Не может использоваться при передачи элементов с категорями.
   * @method deleteItem
   */
  public deleteItem(index: number) {
    if (this.category) {
      console.log('can`t add item to category');
      return;
    }

    const item = this.items[index];

    this.items.splice(index, 1);
    this.render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @description удаляет все елементы из списка и перерисовывает его.
   * @method deleteItemAll
   */
  public deleteItemAll() {
    this.items.splice(0, this.items.length);
    this.render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} index индекс выбранного элемента
   * @description  выбирает элемент который будет изначально отрисовываться в селекте
   * @method selectIndex
   */
  public selectIndex(index: number) {
    if (this.category) {
      console.log('can`t add item to category');
      return;
    }

    const options = this.element!.querySelectorAll('.list__item') as NodeListOf<HTMLElement>;

    if (index > options!.length) {
      return;
    }

    const select: string = options[index].innerText;
    this.render(select);
  }
}
