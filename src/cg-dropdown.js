export class DropDown {
  #element;
  #list;
  #options;
  #caret;
  #items;
  #value;
  #indexes = [];

  get value() {
    return this.#value ?? null;
  }

  get indexes() {
    return this.#indexes ?? [];
  }

  constructor(options = {}) {
    this.#init(options);
    this.#initAmount();
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
      this.#value = [];
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

  #initAmount() {
    const { amount } = this.#options;

    if (!amount) {
      return;
    }

    let templete = '';

    for (let i = 0; i < amount; i++) {
      templete += `<li class="list__item">${i + 1}</li>`;
    }
    this.#element.innerHTML += `<ul class="list">${templete}</ul>`;
  }

  #render(select) {
    const { items, styles, url, multiselect } = this.#options;

    if (select || (select && styles)) {
      this.#initSelected(select);
      this.#customStyles(styles);
    } else {
      this.#initSelected();
    }

    this.#element.querySelector(this.#options.selector);
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

    items.forEach((item) => {
      const li = document.createElement('li');
      let text = '';

      li.classList.add('list__item');

      if (this.#checkItemStruct(item)) {
        text = item.title;
      } else {
        text = item;
      }

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
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

    //ToDO: fix title(item.title!)
    this.#items = [];

    data.forEach((dataItem, index) => {
      const item = {
        id: dataItem.id,
        title: dataItem.name,
        value: index,
      };
      const ul = this.#element.querySelector('.list');
      const li = document.createElement('li');
      const text = document.createTextNode(item.title);

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
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
            let templete = '';

            if (checkIndex === -1) {
              this.#indexes.push(index);

              if (this.#checkItemStruct(item)) {
                this.#value.push(item.title);
              } else {
                this.#value.push(item);
              }

              if (multiselectTag) {
                for (let i = 0; i < this.#value.length; i++) {
                  templete += this.itemMultiTag(this.#value[i]);
                }

                selected.innerHTML = `<ul class="multiselectTag">${templete}</ul>`;
              } else {
                selected.innerText = this.#value;
              }

              return;
            } else {
              this.#indexes.splice(checkIndex, 1);
              this.#value.splice(checkIndex, 1);
            }

            if (multiselectTag) {
              for (let i = 0; i < this.#value.length; i++) {
                templete += this.itemMultiTag(this.#value[i]);
              }

              selected.innerHTML = `<ul class="multiselectTag">${templete}</ul>`;
            }

            if (!this.#value.length) {
              selected.innerText = placeholder;
            } else {
              if (multiselectTag) {
                selected.innerHTML = `<ul class="multiselectTag">${templete}</ul>`;
              } else {
                selected.innerText = this.#value;
              }
            }
          }
        } else {
          if (this.#checkItemStruct(item)) {
            selected.innerText = item.title;
          } else {
            selected.innerText = item;
          }

          this.#value = item;

          options.forEach((option) => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        }
      });
    });
  }

  itemMultiTag(value) {
    return `<li >${value} 
      <svg viewBox="0 0 10 10" class="svgIcon">
          <path d="M3,7 L7,3" class="p1"/>
          <path d="M3,3 L7,7" class="p3"/>
      </svg>
    </li>`;
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
