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

    this.#element = elem;
  }

  #initSelected() {
    if (this.#options.selected) {
      this.#element.innerHTML = `        
            <div class="cg-select">
                <span class="selected">${this.#options.selected}</span>
                <div class="caret"></div>
            </div>
        `;
    } else {
      this.#element.innerHTML = `        
            <div class="cg-select">
                <span class="selected">Select...</span>
                <div class="caret"></div>
            </div>
        `;
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
    const { items } = this.#options;

    if (!Array.isArray(items)) {
      return;
    }

    const templete = items.map((i) => `<li class="list__item">${i}</li>`).join('');

    this.#element.innerHTML += `<ul class="list">${templete}</ul>`;

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

    //ToDo: finish this function
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
}
