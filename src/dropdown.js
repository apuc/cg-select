class DropDown {
  constructor(options = {}) {
    this._init(options);
    this._initSelected();
    this._initAmount();
    this._initItems();
    this._initEvent();
  }

  // on(event, callback) {
  //   if (!this._element || typeof callback !== 'function') {
  //     return;
  //   }
  //   this._element.addEventListener(event, callback.bind(this._element));
  // }

  open() {
    const list = this._element.querySelector('.list');
    const caret = this._element.querySelector('.caret');

    list.classList.toggle('open');
    caret.classList.toggle('caret-rotate');
  }

  _init(options) {
    this._options = options;
    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }

    this._element = elem;
  }

  _initSelected() {
    this._element.innerHTML = `        
            <div class="select">
                <span class="selected">${this._options.selected}</span>
                <div class="caret"></div>
            </div>
        `;

    this._element.addEventListener('click', () => {
      this.open();
    });
  }

  _initAmount() {
    const { amount } = this._options;

    if (!amount) {
      return;
    }

    let templete = '';

    for (let i = 0; i < amount; i++) {
      templete += `<li class="list__item">${i + 1}</li>`;
    }
    this._element.innerHTML += `<ul class="list">${templete}</ul>`;
  }

  _initItems() {
    const { items } = this._options;

    if (!Array.isArray(items)) {
      return;
    }

    const templete = items.map((i) => `<li class="list__item">${i}</li>`).join('');

    this._element.innerHTML += `<ul class="list">${templete}</ul>`;

    const options = this._element.querySelectorAll('.list__item');
    const selected = this._element.querySelector('.selected');

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

  _initEvent() {
    const { targetEvent } = this._options;

    this._element.addEventListener(targetEvent, () => {});
  }
}
