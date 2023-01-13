"use strict";
exports.__esModule = true;
exports.createInputSearch = exports.createBreadCrumb = exports.createNativeSelectOption = exports.createNativeSelect = void 0;
var utilsTs_1 = require("../utils/utilsTs");
/**
 * Метод который создает нативный селект
 * @returns {HTMLSelectElement} Возвращает созданный нативный селект
 */
function createNativeSelect() {
    var nativeSelect = document.createElement('select');
    nativeSelect.setAttribute('name', 'dataSelect');
    nativeSelect.classList.add('nativeSelect');
    return nativeSelect;
}
exports.createNativeSelect = createNativeSelect;
/**
 * Метод который создает Options для нативного селекта
 * @returns {HTMLOptionElement} Возвращает созданные Options нативного селекта
 */
function createNativeSelectOption() {
    var nativeOption = document.createElement('option');
    nativeOption.classList.add('nativeSelect__nativeOption');
    return nativeOption;
}
exports.createNativeSelectOption = createNativeSelectOption;
/**
 * Метод который создает и отвечает за поведение chips
 * @param {ICreateBreadCrumb} data объект в котором содержатся настройки и элементы селекта
 * @param {string} title имя выбранного элемента для отрисовки chips
 * @param {number} index индекс выбранного элемента для отрисовки chips
 * @param {string} id уникальное id выбранного элемента
 * @returns {HTMLElement} возвращает сформированный HTMLElement chips item
 */
function createBreadCrumb(data, title, index, id) {
    var element = data.element, option = data.option, indexes = data.indexes, selectedItems = data.selectedItems;
    var placeholder = option.placeholder, styles = option.styles;
    var selected = element === null || element === void 0 ? void 0 : element.querySelector('.selected');
    var nativeOption = element.querySelectorAll('.nativeSelect__nativeOption');
    var liChip = document.createElement('li');
    var textNode = document.createTextNode(title);
    var svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgIcon.setAttribute('viewBox', '0 0 10 10');
    path1.setAttribute('d', 'M3,7 L7,3');
    path2.setAttribute('d', 'M3,3 L7,7');
    liChip.setAttribute('id', "tag-".concat(index, "-").concat(id));
    svgIcon.classList.add('svg-icon');
    svgIcon.appendChild(path1);
    svgIcon.appendChild(path2);
    liChip.appendChild(textNode);
    liChip.appendChild(svgIcon);
    if (styles) {
        // const { chips } = styles;
        //   customStylesFormat(chips, liChip);
    }
    svgIcon.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        (0, utilsTs_1.nativeOptionMultiple)(nativeOption, title, false);
        var deleteIcon = indexes.indexOf(index);
        var checkBox;
        indexes.splice(deleteIcon, 1);
        selectedItems.splice(deleteIcon, 1);
        if (id) {
            checkBox = document.getElementById("chbox-".concat(id));
        }
        else {
            checkBox = document.getElementById("chbox-".concat(index));
        }
        checkBox.checked = false;
        checkBox.parentElement.classList.remove('active');
        if (!selectedItems.length) {
            selected.innerText = placeholder;
        }
        liChip.parentElement.removeChild(liChip);
    });
    return liChip;
}
exports.createBreadCrumb = createBreadCrumb;
/**
 * Метод который создает поиск элементов в селекте
 * @param {string} random уникальное значение для input элемента.
 * @param {string} lenguage текст на определенном языке переданный из файла language.js
 * @returns {HTMLInputElement} Возвращает сформированный input елемент.
 */
function createInputSearch(random, lenguage) {
    var inputSearch = document.createElement('input');
    inputSearch.type = 'text';
    inputSearch.classList.add('inputSearch');
    inputSearch.setAttribute('id', "searchSelect-".concat(random));
    if (lenguage) {
        inputSearch.setAttribute('placeholder', "".concat(lenguage));
    }
    else {
        inputSearch.setAttribute('placeholder', 'Search...');
    }
    inputSearch.addEventListener('click', function (e) {
        e.preventDefault();
    });
    return inputSearch;
}
exports.createInputSearch = createInputSearch;
