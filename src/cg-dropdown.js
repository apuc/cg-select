import { customStyles, createSelected } from './components/utils';
import { createBreadcrumb } from './components/create-element';

export class DropDown {
  #element;
  #list;
  #options;
  #caret;
  #items;
  #selectedItems;
  #indexes = [];

  get value() {
    return this.#selectedItems ?? null;
  }

  get indexes() {
    return this.#indexes ?? [];
  }

  constructor(options = {}) {
    this.#init(options);
    this.#render();
    this.#initEvent();
  }

  addItem(item) {
    if (!item) {
      return false;
    }

    const random = Math.random().toString(36).substring(2, 10);
    const index = this.#items.length;

    if (typeof item === 'object') {
      item = {
        id: item.id,
        title: item.title,
        value: item.value,
      };
    } else {
      item = {
        id: random,
        title: item,
        value: index,
      };
    }

    this.#items.push(item);
    this.#render();
  }

  deleteItem(item) {
    let index = this.#items.indexOf(item);

    this.#items.splice(index, 1);

    this.#render();
  }

  deleteItemAll() {
    this.#items.splice(0, this.#items.length);
    this.#render();
  }

  selectIndex(index) {
    const options = this.#element.querySelectorAll('.list__item');

    let select = options[index].innerText;

    this.#render(select);
  }

  getElement(number) {
    return this.#items[number];
  }

  #init(options) {
    this.#options = options;
    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }

    this.#element = elem;

    this.#element.addEventListener('click', () => {
      this.#open();
    });

    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    const { items, multiselect, url } = this.#options;
    this.#items = [];

    if (multiselect) {
      this.#selectedItems = [];
    }

    if (!items && url) {
      this.#renderUrl();
      return;
    }

    items.forEach((dataItem, index) => {
      const random = Math.random().toString(36).substring(2, 10);
      let item = {};

      if (this.#checkItemStruct(dataItem)) {
        item = {
          id: dataItem.id,
          title: dataItem.title,
          value: index,
        };
      } else {
        item = {
          id: random,
          title: dataItem,
          value: index,
        };
      }

      this.#items.push(item);
    });
  }

  #initSelected(select) {
    const { styles } = this.#options;

    if (this.#options.selected) {
      createSelected(this.#element, this.#options.selected);
    } else {
      createSelected(this.#element, 'Select...');
    }

    if (!this.#options.selected && this.#options.placeholder) {
      createSelected(this.#element, this.#options.placeholder);
    }

    if (styles) {
      if (this.#options.placeholder) {
        createSelected(this.#element, this.#options.placeholder, styles);
      } else if (this.#options.selected) {
        createSelected(this.#element, this.#options.selected, styles);
      }
      customStyles(this.#element, styles);
    }

    if (select) {
      createSelected(this.#element, select, styles);
    }
  }

  #render(select) {
    const { items, styles, url, multiselect, multiselectTag } = this.#options;

    if (select || (select && styles)) {
      this.#initSelected(select);
      customStyles(this.#element, styles);
    } else {
      this.#initSelected();
    }

    const ul = document.createElement('ul');

    if (styles) {
      const { list } = styles;

      ul.classList.add('list');

      if (ul && list) {
        Object.entries(list).forEach(([key, value]) => {
          ul.style[key] = value;
        });
      }

      this.#element.appendChild(ul);
    } else {
      ul.classList.add('list');
      this.#element.appendChild(ul);
    }

    if (!items && url) {
      this.#renderUrl();
      return;
    }

    this.#items.forEach((dataItem) => {
      const li = document.createElement('li');

      li.classList.add('list__item');

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        if (multiselectTag) {
          checkBox.setAttribute('id', `chbox-${dataItem.id}`);
        }
        li.appendChild(checkBox);
      }

      let textNode = document.createTextNode(dataItem.title);

      li.appendChild(textNode);
      ul.appendChild(li);
    });
    console.log(this.#items);

    this.#addOptionsBehaviour();
  }

  async #renderUrl() {
    const { url } = this.#options;

    if (this.#items) {
      return;
    }

    if (!url) {
      return;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(response);

    data.forEach((dataItem, index) => {
      const item = {
        id: dataItem.phone,
        title: dataItem.name,
        value: index,
      };
      const ul = this.#element.querySelector('.list');
      const li = document.createElement('li');
      const text = document.createTextNode(item.title);

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';

      checkBox.setAttribute('id', `chbox-${item.id}`);

      li.appendChild(checkBox);

      li.classList.add('list__item');
      li.appendChild(text);
      ul.appendChild(li);

      this.#items.push(item);
    });

    this.#addOptionsBehaviour();
  }

  #open() {
    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    this.#list.classList.toggle('open');
    this.#caret.classList.toggle('caret_rotate');
  }

  #close() {
    this.#list.classList.remove('open');
    this.#caret.classList.remove('caret_rotate');
  }

  #addOptionsBehaviour() {
    const { multiselect, placeholder, multiselectTag } = this.#options;

    const options = this.#element.querySelectorAll('.list__item');
    const selected = this.#element.querySelector('.selected');

    const ul = document.createElement('ul');

    if (multiselect) {
      ul.classList.add('multiselect-tag');
      selected.classList.add('overflow-hidden');
    }

    options.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        const item = this.#items[index];

        if (multiselect) {
          event.stopPropagation();
          option.classList.toggle('active');

          const checkBox = option.querySelector('input[type="checkbox"]');

          if (checkBox) {
            if (!(event.target instanceof HTMLInputElement)) {
              checkBox.checked = !checkBox.checked;
            }

            const checkIndex = this.#indexes.indexOf(index);
            let value = '';
            let id = '';

            if (checkIndex === -1) {
              this.#indexes.push(index);

              if (this.#checkItemStruct(item)) {
                this.#selectedItems.push(item.title);
                value = item.title;
                id = item.id;
              } else {
                this.#selectedItems.push(item);
                value = item;
              }

              selected.innerText = '';

              if (multiselectTag) {
                selected.appendChild(ul);

                if (this.#checkItemStruct(item)) {
                  ul.appendChild(
                    createBreadcrumb(
                      this.#options,
                      this.#element,
                      this.#indexes,
                      this.#selectedItems,
                      value,
                      index,
                      id,
                    ),
                  );
                } else {
                  ul.appendChild(
                    createBreadcrumb(
                      this.#options,
                      this.#element,
                      this.#indexes,
                      this.#selectedItems,
                      value,
                      index,
                    ),
                  );
                }
              } else {
                selected.innerText = this.#selectedItems;
              }
            } else {
              if (multiselectTag) {
                const tagItem = document.getElementById(`tag-${index}`);

                ul.removeChild(tagItem);

                this.#indexes.splice(checkIndex, 1);
                this.#selectedItems.splice(checkIndex, 1);
              } else {
                this.#indexes.splice(checkIndex, 1);
                this.#selectedItems.splice(checkIndex, 1);
              }
            }

            if (!this.#selectedItems.length) {
              selected.innerText = placeholder;
            } else {
              if (multiselectTag) {
                selected.appendChild(ul);
              } else {
                selected.innerText = this.#selectedItems;
              }
            }
          }
        } else {
          if (this.#checkItemStruct(item)) {
            selected.innerText = item.title;
          } else {
            selected.innerText = item;
          }
          this.#selectedItems = item;

          options.forEach((option) => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        }
      });
    });
  }

  #initEvent() {
    const { event } = this.#options;
    if (!event) {
      return;
    }

    if (event) {
      let list = this.#element.querySelectorAll('.list');

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

  #checkItemStruct(item) {
    if (item && typeof item !== 'object') {
      return false;
    }

    return (
      item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value')
    );
  }
}
