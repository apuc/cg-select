export class DropDown {
  #element;
  #list;
  #options;
  #caret;

  //ToDo: Added  url, style(list, elem)

  constructor(options = {}) {
    this.#init(options);
    this.#initSelected();
    this.#initAmount();
    this.#initItems();
    this.#initEvent();
    // this.#customStyles();
  }

  #open() {
    this.#list.classList.toggle('open');
    this.#caret.classList.toggle('caret_rotate');
  }

  #init(options) {
    this.#options = options;
    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }
    const { styles } = this.#options;

    this.#element = elem;
  }

  #initSelected() {
    const { styles } = this.#options;
    if (this.#options.selected) {
      this.#createSelected(this.#options.selected);
    } else {
      this.#createSelected('Select...');
    }

    if (!this.#options.selected && this.#options.placeholder) {
      this.#createSelected(this.#options.placeholder);
    }

    if (styles) {
      let style = this.#customStyles(styles);
    }

    this.#element.addEventListener('click', () => {
      this.#open();
    });
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

  #initItems() {
    const { items, styles } = this.#options;

    if (!Array.isArray(items)) {
      return;
    }

    const templete = items.map((item) => `<li class="list__item" >${item}</li>`).join('');
    this.#element.innerHTML += `<ul class="list">${templete}</ul>`;
    //ToDo: fix problem list__item

    if (styles) {
      const templete = items
        .map((item) => `<li class="list__item" style = "${styles}" >${item}</li>`)
        .join('');
      this.#element.innerHTML += `<ul class="list style = "${styles}">${templete}</ul>`;
      this.#customStyles(styles);
    }

    const options = this.#element.querySelectorAll('.list__item');
    const selected = this.#element.querySelector('.selected');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        selected.innerText = option.innerText;

        options.forEach((option) => {
          option.classList.remove('active');
        });
        option.classList.add('active');
      });
    });

    //ToDo: finish this function(catigories)
    items.forEach((item) => {
      if (typeof item === 'object') {
        for (const key in item) {
          const element = item[key];
          // console.log(element);
          if (typeof element === 'string') {
            console.log(element);
          }
        }
      }
    });
  }

  #initEvent() {
    const { event } = this.#options;

    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    if (event === 'mouseenter') {
      this.#element.addEventListener(event, () => {
        this.#list.classList.add('open');
        this.#caret.classList.add('caret_rotate');
      });

      this.#element.addEventListener('mouseleave', () => {
        this.#list.classList.remove('open');
        this.#caret.classList.remove('caret_rotate');
      });
    }
  }

  #customStyles(styles) {
    if (!styles) {
      return;
    }

    //ToDo: fix problem list__item
    const { head, caret, list, list__item } = styles;
    const select = this.#element.querySelector('.cg-select');
    const crt = this.#element.querySelector('.caret');
    const ul = this.#element.querySelector('.list');
    // const li = this.#element.querySelectorAll('.list__item');

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

    if (ul) {
      if (list) {
        Object.entries(list).forEach(([key, value]) => {
          ul.style[key] = value;
        });
      }
    }
  }

  #createSelected(content, styles) {
    this.#element.innerHTML = `
            <div class="cg-select">
                <span class="selected">${content}</span>
                <div class="caret"></div>
            </div>
    `;

    if (styles) {
      this.#customStyles(styles);

      this.#element.innerHTML = `
            <div class="cg-select" style = "${styles}">
                <span class="selected">${content}</span>
                <div class="caret" style = "${styles}"></div>
            </div>
    `;
    }
  }

  // addItem(item) {
  //   const { items } = this.#options;

  //   console.log('Добавление елемента', item);

  //   items.push(item);

  //   console.log(items);
  // }
}
