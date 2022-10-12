export function createSelected(element, content, styles) {
  if (content) {
    element.innerHTML = `
      <button class="cg-select">
          <p class="selected">${content}</p>
          <div class="caret"></div>
      </button>
      `;
  }

  if (styles) {
    customStyles(element, styles);

    element.innerHTML = `
            <button class="cg-select" style = "${styles}">
                <span class="selected" style = "${styles}">${content}</span>
                <div class="caret" style = "${styles}"></div>
            </button>
    `;
  }
}

export function customStyles(element, styles) {
  if (!styles) {
    return;
  }

  const { head, caret, placeholder } = styles;
  const cgSelect = element.querySelector('.cg-select');
  const crt = element.querySelector('.caret');

  const placeh = element.querySelector('.selected');

  if (head) {
    Object.entries(head).forEach(([key, value]) => {
      cgSelect.style[key] = value;
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
