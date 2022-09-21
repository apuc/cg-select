export class DropDown {
  #element;
  #list;
  #options;
  #caret;

  //ToDo: Added  url

  constructor(options = {}) {
    this.#init(options);
    // this.#initAmount();
    this.#render();
    // this.#initEvent();
  }

  #open() {
    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    this.#list.classList.toggle('open');
    this.#caret.classList.toggle('caret_rotate');
  }

  #init(options) {
    this.#options = options;
    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }

    this.#element = elem;
  }

  #initSelected() {
    const { styles } = this.#options;
    console.log(this.#options.placeholder);

    // if (this.#options.selected) {
    //   this.#createSelected(this.#options.selected);
    // } else {
    //   this.#createSelected('Select...');
    // }

    if (!this.#options.selected && this.#options.placeholder) {
      this.#createSelected(this.#options.placeholder);
    }

    // if ((styles && this.#options.placeholder) || (styles && this.#options.selected)) {
    //   this.#createSelected(this.#options.placeholder);
    //   this.#customStyles(styles);
    // } else {
    //   this.#createSelected('Select...');
    //   this.#customStyles(styles);
    // }
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

  //ToDo: fix problem lisiner!
  #render() {
    const { items } = this.#options;

    const templete = items.map((item) => {
      return `
        <li class="list__item" >${item}</li>
      `;
    });

    this.#element.innerHTML = '';
    this.#initSelected();
    this.#element.insertAdjacentHTML('beforeend', `<ul class="list">${templete.join('')}</ul>`);

    this.#element.addEventListener('click', () => {
      console.log('aaasa');
      this.#open();
      this.#selecteItem();
    });
  }

  // #render() {
  //   const { items } = this.#options;

  //   const templete = items.map((item) => {
  //     return `
  //       <li class="list__item" >${item}</li>
  //     `;
  //   });

  //   this.#element.innerHTML = '';
  //   this.#initSelected();
  //   this.#element.insertAdjacentHTML('beforeend', `<ul class="list">${templete.join('')}</ul>`);

  //   this.#element.addEventListener('click', openSelect);

  //   function openSelect() {
  //     console.log('aaasa');
  //     this.#element.removeEventListener('click', openSelect);
  //   }
  // }

  #selecteItem() {
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
  }

  // #initEvent() {
  //   const { event } = this.#options;

  //   this.#list = this.#element.querySelector('.list');
  //   this.#caret = this.#element.querySelector('.caret');

  //   if (event === 'mouseenter') {
  //     this.#element.addEventListener(event, () => {
  //       this.#list.classList.add('open');
  //       this.#caret.classList.add('caret_rotate');
  //     });

  //     this.#element.addEventListener('mouseleave', () => {
  //       this.#list.classList.remove('open');
  //       this.#caret.classList.remove('caret_rotate');
  //     });
  //   }
  // }

  #customStyles(styles) {
    if (!styles) {
      return;
    }

    const { head, caret, list, placeholder } = styles;
    const select = this.#element.querySelector('.cg-select');
    const crt = this.#element.querySelector('.caret');
    const ul = this.#element.querySelector('.list');
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

    if (ul) {
      if (list) {
        Object.entries(list).forEach(([key, value]) => {
          ul.style[key] = value;
        });
      }
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
      console.log('ds');

      this.#element.innerHTML = `
      <div class="cg-select">
          <span class="selected">${content}</span>
          <div class="caret"></div>
      </div>
      `;
    }

    // if (styles) {
    //   this.#customStyles(styles);

    //   this.#element.innerHTML = `
    //         <div class="cg-select" style = "${styles}">
    //             <span class="selected" style = "${styles}">${content}</span>
    //             <div class="caret" style = "${styles}"></div>
    //         </div>
    // `;
    // }
  }

  addItem(item) {
    const { items } = this.#options;

    items.push(item);

    console.log(items);
    this.#render();
  }
}
