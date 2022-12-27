import {
  createSelected,
  customStyles,
  getFormatItem,
  getSelectText,
  customStylesFormat,
  nativeOptionMultiple,
  nativeOptionOrdinary,
  clearSelect,
} from './components/utils';
import {
  createBreadcrumb,
  createInputSearch,
  createNativeSelectOption,
  createNativeSelect,
} from './components/create-element';
import { ru, en } from './language/language';

/**
 * @class Описание класса DropDown
 * @description Этот класс реализовывает функционал кастомного селекта, с возможностями кастомизации.
 * @author Овсяников Максим
 */
export class DropDown {
  /**
   * Созданный HTML елемент
   * @type {HTMLElement}
   */
  #element;
  /**
   * Созданный список(ul), с классом list
   * @type {HTMLElement}
   */
  #list;
  /**
   * Настройки селекта передаваемые при создании экземпляра класса
   * @type {object}
   */
  #options;
  /**
   * Переменная для управления каретки
   * @type {HTMLElement}
   */
  #caret;
  /**
   * Массив переданных элементов
   * @type {object[]}
   */
  #items;
  /**
   * Переданные категории
   * @type {string}
   */
  #category;
  /**
   * Выбранный или массив выбранных элементов из списка
   * @type {object[] | object}
   */
  #selectedItems;
  /**
   * Массив индексов выбранных элементов
   * @type {number[]}
   */
  #indexes = [];

  /**
   * Метод экземпляра класса DropDown
   * @returns {string[] | string | null} Возвращает выбранные элемент(ы) в виде массива/элемента/null
   * @description Геттер возвращающий выбранные элемент(ы) селекта
   */
  get value() {
    return this.#selectedItems ?? null;
  }

  /**
   * Метод экземпляра класса DropDown
   * @returns {number | number[]}Возвращает индексы выбранных элемента(ов) в виде массива/пустой массив
   * @description Геттер возвращающий индексы выбранных элемента(ов) селекта
   */
  get indexes() {
    return this.#indexes ?? [];
  }

  /**
   *
   * @param {object} options Объект принимающий настройки селекта
   * @constructor Конструктор класса DropDown
   * @description  Конструктор принимает объект и рендерит селект.
   * @example
   * options = {
   *  selector: 'Уникальный селектор',
      selected: 'Выбранный элемент',
      placeholder: '...',
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
  constructor(options = {}) {
    this.#init(options);
    this.#render();
    this.#initEvent();
    this.#closeSelectClick();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {string | object} item добавляемый елемент
   * @description добавляет переданный элемент в конец списка и перерисовывает список. Не может использоваться при передачи элементов с категорями
   * @method addItem
   */
  addItem(item) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    if (!item) {
      return false;
    }

    const index = this.#items.length;

    this.#items.push(getFormatItem(item, index));
    this.#render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} index индекс удаляемого элемента
   * @description удаляет елемент по индексу из списка и перерисовывает его. Не может использоваться при передачи элементов с категорями.
   * @method deleteItem
   */
  deleteItem(index) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    const item = this.#items[index];

    this.#items.splice(index, 1);
    this.#render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @description удаляет все елементы из списка и перерисовывает его.
   * @method deleteItemAll
   */
  deleteItemAll() {
    this.#items.splice(0, this.#items.length);
    this.#render();
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} index индекс выбранного элемента
   * @description  выбирает элемент который будет изначально отрисовываться в селекте
   * @method selectIndex
   */
  selectIndex(index) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    const options = this.#element.querySelectorAll('.list__item');

    if (index > options.length) {
      return;
    }

    const select = options[index].innerText;
    this.#render(select);
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {number} numberItem номер возвращаемого элемента
   * @returns {HTMLElement} возвращает ссылку на выбранный HTML элемент
   * @method getElement
   */
  getElement(numberItem) {
    if (numberItem > this.#items.length) {
      return;
    }
    return this.#items[numberItem];
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {boolean} value - Передаваемый параметр для добавления атрибута disabled;
   * @description Метод позволяющий переключать состояние селекта disabled,
   * @method disabled
   */
  disabled(value) {
    if (typeof value !== 'boolean') {
      return;
    }

    const select = this.#element.querySelector('.cg-select');
    const nativeSelect = this.#element.querySelector('.nativeSelect');
    if (value === true) {
      this.#element.setAttribute('disabled', true);
      nativeSelect.setAttribute('disabled', true);
      select.classList.add('disabled');
    } else {
      this.#element.removeAttribute('disabled');
      nativeSelect.removeAttribute('disabled');
      select.classList.remove('disabled');
    }
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {HTMLInputElement} button - HTML кнопка
   * @param {string} method - метод открытия open/close
   * @description Метод позволяющий открывать/закрывать селект с помощью кнопок
   * @method buttonControl
   */
  buttonControl(button, method) {
    const {listDisplayMode} = this.#options;


    if(listDisplayMode === true){
      return
    }

    this.btn = button;
    button.addEventListener('click', () => {
      if (method.toLowerCase() === 'open') {
        this.#open(true);
      } else if (method.toLowerCase() === 'close') {
        this.#close();
      } else {
        return;
      }
    });
  }

  /**
   * Метод экземпляра класса DropDown
   * @param {object} language объект в котором находятся поля для подключения языка имеет два обязательных поля placeholder, textInListSearch
   * @description метод позволяющий заменить плейсхолдер в поиске и текст который выводится если нет результата
   * @method addLanguage
   */
  addLanguage(language) {
    const { placeholder, textInListSearch, selectPlaceholder } = language;
    const { searchMode } = this.#options;

    const select = this.#element.querySelector('.selected');
    const textNodeSelect = document.createTextNode(selectPlaceholder);
    select.appendChild(textNodeSelect);

    if (searchMode && searchMode == true) {
      const search = this.#element.querySelector('.inputSearch');
      const textNoRezult = this.#element.querySelector('.noRezult');
      const textNode = document.createTextNode(textInListSearch);

      search.setAttribute('placeholder', placeholder);
      search.setAttribute('placeholder', placeholder);

      textNoRezult.innerText = '';
      textNoRezult.appendChild(textNode);
    }
  }

  /**
   * Приватный метод инициализации экземпляра класса DropDown
   * @method #init
   * @member
   * @protected
   * @param {object} options передаваемые настройки селекта
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
  #init(options) {
    this.#options = options;
    const { items, multiselect, url } = this.#options;

    const elem = document.querySelector(options.selector);

    //TODO: для теста в реакте нужно пересмотреть необходимость этой проверки!
    // if (!elem) {
    //   throw new Error(`Element with selector ${options.selector}`);
    // }

    this.#element = elem;

    this.#element.addEventListener('click', (e) => {
      e.preventDefault();
      this.#open();
    });

    this.#items = [];

    if (multiselect && multiselect == true) {
      this.#selectedItems = [];
    }

    if (!items && url) {
      this.#renderUrl();
      return;
    }

    items.forEach((dataItem, index) => {
      if (dataItem.category && dataItem.categoryItems) {
        this.#category = dataItem.category;

        this.#items.push(this.#category);
        dataItem.categoryItems.forEach((categoryItem, indexCategory) => {
          this.#items.push(getFormatItem(categoryItem, indexCategory));
        });
      } else {
        this.#items.push(getFormatItem(dataItem, index));
      }
    });
  }

  /**
   * Привaтный метод экземпляра класса DropDown
   *
   * @method #initSelected
   * @param {string} select необязательный елемент. Используется в методе selectIndex
   * @description Отрисовывает и стилизует селект
   * @protected
   */
  #initSelected(select) {
    const { styles, selected, placeholder, lable, language } = this.#options;

    if (selected) {
      createSelected(this.#element, selected);
    } else if (placeholder) {
      createSelected(this.#element, placeholder);
    } else {
      if (language && language === 'ru') {
        createSelected(this.#element, ru.selectPlaceholder);
      } else {
        createSelected(this.#element, en.selectPlaceholder);
      }
    }

    if (select) {
      createSelected(this.#element, select, styles);
    }

    if (lable) {
      const lableItem = document.createElement('h1');
      const textLable = document.createTextNode(lable);

      lableItem.appendChild(textLable);
      lableItem.classList.add('label');

      this.#element.insertAdjacentElement('beforebegin', lableItem);
    }

    if (styles) {
      customStyles(this.#element, styles);
    }
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   *@protected
   * @method #render
   * @param {string} select  необязательный елемент. Передаеться в метод initSelected
   * @description Рендер елементов в селекте.
   */
  #render(select) {
    const { 
      styles, multiselect, 
      searchMode, multiselectTag, 
      darkTheme, language, 
      nativeSelectMode, listDisplayMode 
    } = this.#options;

    const random = Math.random().toString(36).substring(2, 10);

    if (select || (select && styles)) {
      this.#initSelected(select);
      customStyles(this.#element, styles);
    } else {
      this.#initSelected();
    }

    const ulList = document.createElement('ul');
    const nativeSelect = createNativeSelect();

    let inputSearch = '';
    this.random = random;

    if (searchMode) {
      if (language === 'ru') {
        inputSearch = createInputSearch(random, ru.placeholder);
      } else {
        inputSearch = createInputSearch(random, en.placeholder);
      }
      const { search } = styles;
      customStylesFormat(search, inputSearch);
      ulList.appendChild(inputSearch);
    }

    ulList.classList.add('list');

    if (styles) {
      const { list } = styles;
      customStylesFormat(list, ulList);
    }

    this.#element.appendChild(ulList);

    this.#items.forEach((dataItem) => {
      this.#element.appendChild(nativeSelect);

      const liItem = document.createElement('li');
      const nativeOption = createNativeSelectOption();
      const strongItem = document.createElement('strong');

      liItem.classList.add('list__item');
      strongItem.classList.add('category');

      if (multiselect && multiselect == true) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);
        liItem.appendChild(checkBox);

        if (multiselectTag && multiselectTag == true) {
          checkBox.classList.add('displayHide');
        }

        nativeSelect.setAttribute('multiple', 'multiple');
      }

      let textNode = '';

      if (dataItem.title) {
        nativeOption.text = dataItem.title;
        nativeOption.value = dataItem.title;
        textNode = document.createTextNode(dataItem.title);

        nativeSelect.appendChild(nativeOption);
        liItem.appendChild(textNode);
        ulList.appendChild(liItem);
      } else {
        textNode = document.createTextNode(dataItem);
        strongItem.appendChild(textNode);
        ulList.appendChild(strongItem);
      }
    });

    this.#items.filter((item, index) => {
      if (typeof item !== 'object') {
        this.#items.splice(index, 1);
      }
      return item;
    });

    if (darkTheme == false) {
      this.#checkTheme();
    }

    if(nativeSelectMode === true){
      this.#SelectMode(nativeSelectMode);
    }



    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    if(listDisplayMode === true){
      this.#DisplayMode(listDisplayMode)
    }

    this.#addOptionsBehaviour();
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   * @protected
   * @method #checkTheme
   * @description Изменяет цветовую схему с темной на светлую.
   */
  #checkTheme() {
    const { darkTheme, searchMode } = this.#options;

    const select = this.#element.querySelector('.cg-select');
    const caret = this.#element.querySelector('.caret');
    const list = this.#element.querySelector('ul.list');
    const search = this.#element.querySelector('.inputSearch');

    if (darkTheme == false) {
      select.classList.add('selectWhite');
      caret.classList.add('caretWhite');
      list.classList.add('listWhite');

      if (searchMode == true) {
        search.classList.add('inputWhite');
      }
    } else if (darkTheme == true || !darkTheme) {
      return;
    } else {
      throw new Error('Styles error or invalid value entered!');
    }
  }

  /**
   * Приватный метод рендера экземпляра класса DropDown
   *@protected
   * @method #renderUrl
   * @description Рендер елементов в селекте переданных с URL и их настойка
   */
  async #renderUrl() {
    const { url, items, multiselect, multiselectTag } = this.#options;

    if (items) {
      return;
    }

    if (!url) {
      return;
    }

    const response = await fetch(url);
    const dataUrl = await response.json();

    const nativeSelect = createNativeSelect();

    dataUrl.forEach((dataItem, index) => {
      const item = {
        id: dataItem.id,
        title: dataItem.name,
        value: index,
      };
      const ulUrl = this.#element.querySelector('.list');

      const nativeOption = createNativeSelectOption();
      const liUrl = document.createElement('li');
      const textUrl = document.createTextNode(item.title);

      if (multiselect && multiselect == true) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        if (multiselectTag && multiselectTag == true) {
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
      ulUrl.appendChild(liUrl);

      this.#items.push(item);
    });

    this.#element.appendChild(nativeSelect);

    this.#items.filter((item, index) => {
      if (typeof item !== 'object') {
        this.#items.splice(index, 1);
      }
      return item;
    });

    this.#addOptionsBehaviour();
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} oneClick необязательный параметр передаваемый из функции buttonControl
   * @description Открывает список для выбора элемента
   * @method #open
   */
  #open(oneClick) {
    if (oneClick === true) {
      this.#list.classList.add('open');
      this.#caret.classList.add('caret_rotate');
    } else {
      this.#list.classList.toggle('open');
      this.#caret.classList.toggle('caret_rotate');
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Закрывает список
   * @method #close
   */
  #close() {
    this.#list.classList.remove('open');
    this.#caret.classList.remove('caret_rotate');
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Метод реализовывающий выбор элементов в разных режимах. Обычный/Мультиселект/Мультиселект + Мультиселект Таг.
   * @method #addOptionsBehaviour
   */
  #addOptionsBehaviour() {
    const {
      multiselect,
      placeholder,
      selected,
      multiselectTag,
      searchMode,
      closeOnSelect,
      darkTheme,
    } = this.#options;

    const options = this.#element.querySelectorAll('.list__item');
    const select = this.#element.querySelector('.selected');
    const nativeOption = this.#element.querySelectorAll('.nativeSelect__nativeOption');

    const ulMultipul = document.createElement('ul');

    if (multiselect && multiselect == true) {
      ulMultipul.classList.add('multiselect-tag');
      select.classList.add('overflow-hidden');
    }

    if (searchMode && searchMode === true) {
      this.#searchMode(this.random);
    }

    options.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        const dataSelectText = {
          placeholder,
          selected,
          selectedItems: this.#selectedItems,
          indexes: this.#indexes,
          darkTheme,
          multiselectTag,
        };

        const item = this.#items[index];

        if (closeOnSelect == false || (multiselect && multiselect == true)) {
          event.stopPropagation();
          event.preventDefault();
        }

        const checkIndex = this.#indexes.indexOf(index);

        if (multiselect && multiselect == true) {
          option.classList.toggle('active');
          const checkBox = option.querySelector('input[type="checkbox"]');

          if (checkBox) {
            if (!(event.target instanceof HTMLInputElement)) {
              checkBox.checked = !checkBox.checked;
            }

            if (checkIndex === -1) {
              nativeOptionMultiple(nativeOption, item.title, true);
              this.#indexes.push(index);
              select.innerText = '';

              if (multiselectTag && multiselectTag == true) {
                this.#selectedItems.push(item);
                select.appendChild(ulMultipul);

                const data = {
                  option: this.#options,
                  element: this.#element,
                  indexes: this.#indexes,
                  selectedItems: this.#selectedItems,
                };

                ulMultipul.appendChild(createBreadcrumb(data, item.title, index, item.id));
              } else {
                this.#selectedItems.push(item.title);
                select.innerText = this.#selectedItems;
              }
            } else {
              if (multiselectTag && multiselectTag == true) {
                const tagItem = document.getElementById(`tag-${index}-${item.id}`);
                ulMultipul.removeChild(tagItem);
              }

              this.#indexes.splice(checkIndex, 1);
              this.#selectedItems.splice(checkIndex, 1);
              nativeOptionMultiple(nativeOption, item.title, false);
            }

            if (!this.#selectedItems.length) {
              getSelectText(dataSelectText, select);
            } else {
              if (multiselectTag && multiselectTag == true) {
                select.appendChild(ulMultipul);
              } else {
                select.innerText = this.#selectedItems;
              }
            }
          }
        } else {
          select.innerText = item.title;
          this.#selectedItems = item;

          nativeOptionOrdinary(nativeOption, item.title);

          options.forEach((option) => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        }

        clearSelect(select, this.#element, dataSelectText);
      });
    });
  }

  /**
   * Метод который реализует поиск элементов в селекте
   * @protected
   * @param {string} random уникальное значение для input элемента.
   * @method #searchMode
   */
  #searchMode(random) {
    const { language } = this.#options;

    const input = this.#element.querySelector(`#searchSelect-${random}`);
    const searchSelect = this.#element.querySelectorAll('.list__item');
    const result = document.createElement('p');

    let textNode = '';
    if (language && language === 'ru') {
      textNode = document.createTextNode(`${ru.textInListSearch}`);
    } else {
      textNode = document.createTextNode(`${en.textInListSearch}`);
    }

    result.appendChild(textNode);
    result.classList.add('displayHide');
    result.classList.add('noRezult');
    input.parentElement.appendChild(result);

    input.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    input.oninput = function () {
      let valueSearch = this.value.trim().toLowerCase();
      let anyMatch = false;

      if (valueSearch != '') {
        searchSelect.forEach((elem) => {
          let isMatching = new RegExp(valueSearch, 'gi').test(elem.textContent);
          anyMatch = anyMatch || isMatching;

          if (elem.textContent.toLowerCase().search(valueSearch) == -1) {
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

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Открывает и закрывает список по переданному эвенту
   * @method #initEvent
   */
  #initEvent() {
    const { event } = this.#options;
    if (!event) {
      return;
    }

    if (event) {
      if (event === 'mouseenter') {
        this.#element.addEventListener(event, () => {
          this.#open();
        });
        this.#element.addEventListener('mouseleave', () => {
          this.#close();
        });
      }
    }
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @description Закрывает список по клику вне элемента
   * @method #closeSelectClick
   */
  #closeSelectClick() {
    const dropdown = document.querySelector(`${this.#options.selector}`);

    document.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(dropdown);
      if (!withinBoundaries) {
        if (this.btn) {
          return;
        } else {
          this.#close();
        }
      }
    });
  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} nativeSelectMode параметр отвечающий за добавления нативного селекта.
   * @description Изменяет отображение селекта на мобильных устройствах
   * @method #SelectMode
   */
  #SelectMode(nativeSelectMode){
    let win = window.outerWidth;

    if(nativeSelectMode === true){
      const select = this.#element.querySelector('.cg-select');
      const list = this.#element.querySelector('.list');
      const nativeSelect = this.#element.querySelector('.nativeSelect')

      if(win < 576){
        select.classList.add('displayHide');
        list.classList.add('displayHide');
        nativeSelect.classList.add('nativeSelectActive');       
      } else if( win > 576){
        select.classList.remove('displayHide');
        list.classList.remove('displayHide');
        nativeSelect.classList.remove('nativeSelectActive');
        nativeSelect.classList.add('displayHide');
      }
    } else{
      return
    }

  }

  /**
   * Приватный метод экземпляра класса DropDown
   * @protected
   * @param {boolean} listDisplayMode параметр отвечающий за отображение выбора в виде модального окна.
   * @description Изменяет отображение листа с выбором в виде модального окна.
   * @method #DisplayMode
   * @returns 
   */
  #DisplayMode(listDisplayMode){
    if(listDisplayMode === true){
      const modal = document.createElement('div');
      const body = document.querySelector('body')
      const list = this.#list;
  
      modal.appendChild(list);
      this.#element.appendChild(modal);

      this.#element.addEventListener('click', () => {
        modal.classList.toggle('modal');
        list.classList.toggle('listModal');
        body.classList.toggle('overflowHide')
      });

    } else{
      return
    }

  }
}
