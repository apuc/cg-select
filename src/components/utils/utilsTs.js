"use strict";
/**
 * Utils module
 * @module Utils
 */
exports.__esModule = true;
exports.customStylesFormat = exports.customStyles = exports.nativeOptionMultiple = exports.nativeOptionOrdinary = exports.clearSelect = exports.createSelected = exports.checkItemStruct = exports.getSelectText = exports.getFormatItem = void 0;
/**
 * Преобразование каждого елемента полученного из поля Items;
 * @param {any} dataItem полученный елемент переданный при создании селекта может быть как object / string
 * @param {number} index индекс этого элемента
 * @returns {IItems} возвращает сформированный объект
 */
function getFormatItem(dataItem, index) {
    var random = Math.random().toString(36).substring(2, 10);
    var item;
    if (checkItemStruct(dataItem)) {
        return dataItem;
    }
    else {
        item = {
            id: random,
            title: dataItem,
            value: index
        };
        return item;
    }
}
exports.getFormatItem = getFormatItem;
/**
 * Вставка изначального текста селекта(до выбора)
 * @param {ITextSelect} data объект в котором находяться title селекта
 * @param {HTMLElement | null | undefined} select елемент селекта, куда будет вставляться title
 * @returns {HTMLElement} возвращает сформированный елемент селекта
 */
function getSelectText(data, select) {
    var placeholder = data.placeholder, selected = data.selected;
    if (placeholder) {
        select.innerText = placeholder;
    }
    else if (selected) {
        select.innerText = selected;
    }
    else {
        select.innerText = 'Select...';
    }
    return select;
}
exports.getSelectText = getSelectText;
/**
 * Проверка содержит ли item  указанные свойства,
 * @param {object} item проверяемый на определенную структуру элемент
 * @returns {boolean} возвращает true/false если item содержит указанные свойства
 */
function checkItemStruct(item) {
    if (item && typeof item !== 'object') {
        return false;
    }
    return item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value');
}
exports.checkItemStruct = checkItemStruct;
/**
 * Создание кнопки выбора элементов
 * @param {HTMLElement} element созданный экземпляр класса DropDown
 * @param {string} content placeholer передаваемый из настроек селекта
 * @param {object} styles не обязательный параметр. Объект в котором находяться настройки кастомизации частей селекта
 */
function createSelected(element, content, styles) {
    var select = document.createElement('div');
    var selected = document.createElement('p');
    var caret = document.createElement('div');
    select.classList.add('cg-select');
    selected.classList.add('selected');
    caret.classList.add('caret');
    select.appendChild(selected);
    select.appendChild(caret);
    if (content) {
        var text = document.createTextNode(content);
        selected.appendChild(text);
        element === null || element === void 0 ? void 0 : element.appendChild(select);
    }
    else if (styles) {
        customStyles(element, styles);
        select.setAttribute('style', "".concat(styles));
        selected.setAttribute('style', "".concat(styles));
        caret.setAttribute('style', "".concat(styles));
    }
}
exports.createSelected = createSelected;
/**
 * Создание кнопки отчиски селекта, при единичном выборе.
 * @param {HTMLElement} select место в селекте которое будет переназначено на ''.
 * @param {Element} element экземпляр класса DropDown.
 * @param {ISelectedItems} dataSelectText текст который отрисовывается в селекте.
 */
function clearSelect(select, element, dataSelectText) {
    var selectedItems = dataSelectText.selectedItems, indexes = dataSelectText.indexes, darkTheme = dataSelectText.darkTheme, multiselectTag = dataSelectText.multiselectTag;
    var options = element.querySelectorAll('.list__item');
    var ulMultiSelect = element.querySelector('.multiselect-tag');
    var svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var checkBox = element.querySelectorAll('li input');
    svgIcon.setAttribute('viewBox', '0 0 10 10');
    path1.setAttribute('d', 'M2,8 L8,2');
    path2.setAttribute('d', 'M2,2 L8,8');
    svgIcon.appendChild(path1);
    svgIcon.appendChild(path2);
    if (multiselectTag) {
        return;
    }
    if (darkTheme === true || !darkTheme) {
        path1.classList.add('pathWhite');
        path2.classList.add('pathWhite');
    }
    if (darkTheme === false) {
        path1.classList.add('pathBlack');
        path2.classList.add('pathBlack');
    }
    svgIcon.classList.add('svg-icon');
    svgIcon.classList.add('svg-clear');
    select.appendChild(svgIcon);
    svgIcon.addEventListener('click', function () {
        select.innerText = '';
        if (Array.isArray(selectedItems)) {
            selectedItems.splice(0);
            indexes.splice(0);
        }
        checkBox.forEach(function (item) {
            if (item instanceof HTMLInputElement) {
                item.checked = false;
            }
        });
        getSelectText(dataSelectText, select);
        options.forEach(function (option) {
            option.classList.remove('active');
        });
    });
}
exports.clearSelect = clearSelect;
/**
 * Поведение нативного(одинарного) селекта при выборе кастомного
 * @param {NodeList} element NodeList нативного селекта
 * @param {any} item выбранный элемент в кастомном селекте
 */
function nativeOptionOrdinary(element, item) {
    element.forEach(function (option) {
        option.removeAttribute('selected');
        if (option.textContent === item) {
            option.setAttribute('selected', 'selected');
        }
    });
}
exports.nativeOptionOrdinary = nativeOptionOrdinary;
/**
 * Поведение нативного(Multiple) селекта при выборе в кастомном
 * @param {NodeListOf<Element> | undefined} element NodeList нативного селекта
 * @param {string} item выбранный элемент в кастомном селекте
 * @param {boolean} condition специальный флаг при котором добавляются/убераются атрибуты у нативного селекта
 */
function nativeOptionMultiple(element, item, condition) {
    element.forEach(function (option) {
        if (condition == true) {
            if (option.textContent === item) {
                option.setAttribute('selected', 'selected');
            }
        }
        else if (condition == false) {
            if (option.textContent === item) {
                option.removeAttribute('selected');
            }
        }
        else {
            return;
        }
    });
}
exports.nativeOptionMultiple = nativeOptionMultiple;
/**
 * Поиск и стилизация елементов полученных из styles экземпляра DropDown
 * @param {Element} element созданный экземпляр класса DropDown
 * @param {object} styles объект в котором находяться настройки кастомизации частей селекта
 */
function customStyles(element, styles) {
    var cgSelect = element.querySelector('.cg-select');
    var caretSelect = element.querySelector('.caret');
    var placeholderSelect = element.querySelector('.selected');
    var lableItem = element.parentElement.querySelector('h1.label');
    customStylesFormat(styles.head, cgSelect);
    customStylesFormat(styles.caret, caretSelect);
    customStylesFormat(styles.lable, lableItem);
    if (placeholderSelect) {
        customStylesFormat(styles.placeholder, placeholderSelect);
    }
}
exports.customStyles = customStyles;
/**
 * Универсальный метод для стилизации селекта
 * @param {object} elemOption объект полученное из объекта styles у которого мы получаем ключ-значение стилей
 * @param {HTMLElement} selector  HTMLElement подвергающиеся кастомизации
 */
function customStylesFormat(elemOption, selector) {
    if (elemOption) {
        Object.entries(elemOption).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            selector.style[key] = value;
        });
    }
}
exports.customStylesFormat = customStylesFormat;
