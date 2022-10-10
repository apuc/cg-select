export class DropDown {
  #element;
  #list;
  #options;
  #caret;
  #items;
  #selectedItems;
  #id = [];
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

    const { items, multiselect } = this.#options;
    this.#items = items;

    if (multiselect) {
      this.#selectedItems = [];
    }
  }

  #initSelected(select) {
    const { styles } = this.#options;

    if (this.#options.selected) {
      this.#createSelected(this.#options.selected);
    } else {
      this.#createSelected('Select...');
    }

    if (!this.#options.selected && this.#options.placeholder) {
      this.#createSelected(this.#options.placeholder);
    }

    if ((styles && this.#options.placeholder) || (styles && this.#options.selected)) {
      this.#createSelected(this.#options.placeholder);
      this.#customStyles(styles);
    } else {
      this.#customStyles(styles);
    }

    if (select) {
      this.#createSelected(select);
    }
  }

  #render(select) {
    const { items, styles, url, multiselect, multiselectTag } = this.#options;

    if (select || (select && styles)) {
      this.#initSelected(select);
      this.#customStyles(styles);
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

    items.forEach((item, index) => {
      const li = document.createElement('li');
      let text = '';
      let id = '';

      li.classList.add('list__item');

      if (this.#checkItemStruct(item)) {
        text = item.title;
        id = item.id;
      } else {
        text = item;
      }

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        if (multiselectTag) {
          if (this.#checkItemStruct(item)) {
            checkBox.setAttribute('id', `chbox-${item.id}`);
          } else {
            checkBox.setAttribute('id', `chbox-${index}`);
          }
        }

        li.appendChild(checkBox);
      }

      let textNode = document.createTextNode(text);

      li.appendChild(textNode);
      ul.appendChild(li);
    });

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

    this.#items = [];

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
                  ul.appendChild(this.#createBreadcrumb(value, index, id));
                } else {
                  ul.appendChild(this.#createBreadcrumb(value, index));
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

  #createBreadcrumb(value, index, id) {
    const { placeholder } = this.#options;

    const selected = this.#element.querySelector('.selected');

    const li = document.createElement('li');
    const text = document.createTextNode(value);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.setAttribute('viewBox', '0 0 10 10');
    path1.setAttribute('d', 'M3,7 L7,3');
    path2.setAttribute('d', 'M3,3 L7,7');
    li.setAttribute('id', `tag-${index}`);

    svg.classList.add('svg-icon');

    svg.appendChild(path1);
    svg.appendChild(path2);
    li.appendChild(text);
    li.appendChild(svg);

    svg.addEventListener('click', (event) => {
      event.stopPropagation();

      const deleteIcon = this.#indexes.indexOf(index);

      this.#indexes.splice(deleteIcon, 1);
      this.#selectedItems.splice(deleteIcon, 1);

      let checkBox = '';
      if (id) {
        checkBox = document.getElementById(`chbox-${id}`);
      } else {
        checkBox = document.getElementById(`chbox-${index}`);
      }

      checkBox.checked = false;
      checkBox.parentElement.classList.remove('active');

      if (!this.#selectedItems.length) {
        selected.innerText = placeholder;
      }

      li.parentElement.removeChild(li);
    });

    return li;
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

  #customStyles(styles) {
    if (!styles) {
      return;
    }

    const { head, caret, placeholder } = styles;
    const select = this.#element.querySelector('.cg-select');
    const crt = this.#element.querySelector('.caret');

    const placeh = this.#element.querySelector('.selected');

    if (head) {
      Object.entries(head).forEach(([key, value]) => {
        select.style[key] = value;
      });
    }

    if (caret) {
      Object.entries(caret).forEach(([key, value]) => {
        crt.style[key] = value;
      });
    }

    if (placeh) {
      if (placeholder) {
        Object.entries(placeholder).forEach(([key, value]) => {
          placeh.style[key] = value;
        });
      }
    }
  }

  #createSelected(content, styles) {
    if (content) {
      this.#element.innerHTML = `
      <div class="cg-select">
          <p class="selected">${content}</p>
          <div class="caret"></div>
      </div>
      `;
    }

    if (styles) {
      this.#customStyles(styles);

      this.#element.innerHTML = `
            <div class="cg-select" style = "${styles}">
                <span class="selected" style = "${styles}">${content}</span>
                <div class="caret" style = "${styles}"></div>
            </div>
    `;
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
