"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CGSelect = void 0;
var create_elementTs_1 = require("./components/create-element/create-elementTs");
var utilsTs_1 = require("./components/utils/utilsTs");
var languageTS_1 = require("./language/languageTS");
require("./main.scss");
/**
 * @class Описание класса ICgSelect
 * @description Этот класс реализовывает функционал кастомного селекта, с возможностями кастомизации.
 * @author Овсяников Максим
 */
var CGSelect = /** @class */ (function () {
    /**
     * @param {ICgSelect} setting Объект принимающий настройки селекта
     * @constructor Конструктор класса DropDown
     * @description  Конструктор принимает объект и рендерит селект.
     * @example
     * options = {
     *  selector: 'Уникальный селектор',
        selected: 'Выбранный элемент',
        placeholder: '...',
        lable: '...'
        items: [string|number|object],
        darkTheme: true/false,
        searchMode: true/false,
        closeOnSelect:  true/false,
        nativeSelectMode: true/false,
        listDisplayMode: true/false,
        language: 'ru/en',
        styles: {
          head: {
            background: '...',
          },
          list: {...},
          chips: {...},
          caret: {...},
          placeholder: {...},
          lable: {..},
        },
        event: '...',
        url: 'http/...',
        multiselect: true/false,
        multiselectTag: true/false,
     * }
     */
    function CGSelect(setting) {
        /**
         * Массив индексов выбранных элементов
         * @type {number[]}
         */
        this.indexes = [];
        this.init(setting);
        this.render();
        this.closeSelectClick();
        this.initEvent();
    }
    Object.defineProperty(CGSelect.prototype, "value", {
        //Getters
        /**
         * Метод экземпляра класса DropDown
         * @returns {string[] | string} Возвращает выбранные элемент(ы) в виде массива/элемента/null
         * @description Геттер возвращающий выбранные элемент(ы) селекта
         */
        get: function () {
            var _a;
            return (_a = this.selectedItems) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CGSelect.prototype, "indexesOf", {
        /**
         * Метод экземпляра класса DropDown
         * @returns {number | number[]}Возвращает индексы выбранных элемента(ов) в виде массива/пустой массив
         * @description Геттер возвращающий индексы выбранных элемента(ов) селекта
         */
        get: function () {
            var _a;
            return (_a = this.indexes) !== null && _a !== void 0 ? _a : [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Приватный метод инициализации экземпляра класса DropDown
     * @method init
     * @member
     * @protected
     * @param {ISgSelect} setting передаваемые настройки селекта
     * @description Приватный метод. Общая инициализация селекта. Получение настоек и преобразвание элементов селекта.
     * @example
     *  {
          selector: '.cg-dropdown_one',
          placeholder: 'Выберите авто',
          items: [
            'BMW',
            {
              id: '213sade',
              title: 'Opel',
              value: 1,
            },
            'Mersedes',
            'MAN',
            'max',
          ],
          darkTheme: true,
          multiselect: true,
          multiselectTag: true,
        }
     */
    CGSelect.prototype.init = function (setting) {
        var _this = this;
        var _a;
        var items = setting.items, multiselect = setting.multiselect, multiselectTag = setting.multiselectTag, url = setting.url, selector = setting.selector, listDisplayMode = setting.listDisplayMode, nativeSelectMode = setting.nativeSelectMode, searchMode = setting.searchMode, darkTheme = setting.darkTheme, language = setting.language, styles = setting.styles, lable = setting.lable, event = setting.event, selected = setting.selected, placeholder = setting.placeholder;
        this.options = setting;
        this.multiselect = multiselect;
        this.multiselectTag = multiselectTag;
        this.url = url;
        this.selector = selector;
        this.items = items;
        this.searchMode = searchMode;
        this.darkTheme = darkTheme;
        this.language = language;
        this.nativeSelectMode = nativeSelectMode;
        this.listDisplayMode = listDisplayMode;
        this.styles = styles;
        this.lable = lable;
        this.event = event;
        this.selected = selected;
        this.placeholder = placeholder;
        var elem = document.querySelector(this.selector);
        this.element = elem;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            e.preventDefault();
            _this.open();
        });
        this.items = [];
        if (!this.items && this.url) {
            this.renderUrl();
            return;
        }
        utilsTs_1.createSelected;
        items.forEach(function (dataItem, index) {
            var itemInputs = {
                ItemValue: dataItem,
                category: dataItem.category,
                categoryItems: dataItem.categoryItems
            };
            if (itemInputs.category && itemInputs.categoryItems) {
                _this.category = itemInputs.category;
                _this.items.push(_this.category);
                itemInputs.categoryItems.forEach(function (categoryItem, indexCategory) {
                    _this.items.push((0, utilsTs_1.getFormatItem)(categoryItem, indexCategory));
                });
            }
            else {
                _this.items.push((0, utilsTs_1.getFormatItem)(itemInputs.ItemValue, index));
            }
        });
    };
    /**
     * Приватный метод рендера экземпляра класса DropDown
     * @protected
     * @method render
     * @param {string} select  необязательный елемент. Передаеться в метод initSelected
     * @description Рендер елементов в селекте.
     */
    CGSelect.prototype.render = function (select) {
        var _this = this;
        var _a, _b;
        var random = Math.random().toString(36).substring(2, 10);
        if (select || (select && this.styles)) {
            this.initSelected(select);
            (0, utilsTs_1.customStyles)(this.element, this.styles);
        }
        else {
            this.initSelected();
        }
        var ulList = document.createElement('ul');
        var nativeSelect = (0, create_elementTs_1.createNativeSelect)();
        var inputSearch;
        var textNode;
        this.randomId = random;
        ulList.classList.add('list');
        if (this.styles) {
            (0, utilsTs_1.customStylesFormat)(this.styles.list, ulList);
        }
        if (this.searchMode) {
            if (this.language === 'ru') {
                inputSearch = (0, create_elementTs_1.createInputSearch)(random, languageTS_1.ru.placeholder);
            }
            else {
                inputSearch = (0, create_elementTs_1.createInputSearch)(random, languageTS_1.en.placeholder);
            }
            (0, utilsTs_1.customStylesFormat)((_a = this.styles) === null || _a === void 0 ? void 0 : _a.search, inputSearch);
            ulList.appendChild(inputSearch);
        }
        (_b = this.element) === null || _b === void 0 ? void 0 : _b.appendChild(ulList);
        this.items.forEach(function (dataItem) {
            var _a;
            (_a = _this.element) === null || _a === void 0 ? void 0 : _a.appendChild(nativeSelect);
            var liItem = document.createElement('li');
            var nativeOption = (0, create_elementTs_1.createNativeSelectOption)();
            var strongItem = document.createElement('strong');
            liItem.classList.add('list__item');
            strongItem.classList.add('category');
            if (_this.multiselect) {
                var checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.setAttribute('id', "chbox-".concat(dataItem.id));
                liItem.appendChild(checkBox);
                if (_this.multiselectTag) {
                    checkBox.classList.add('displayHide');
                }
                nativeSelect.setAttribute('multiple', 'multiple');
            }
            if (dataItem.title) {
                nativeOption.text = dataItem.title;
                nativeOption.value = dataItem.title;
                textNode = document.createTextNode(dataItem.title);
                nativeSelect.appendChild(nativeOption);
                liItem.appendChild(textNode);
                ulList.appendChild(liItem);
            }
            else {
                // Для отрисовки категорий
                textNode = document.createTextNode(dataItem);
                strongItem.appendChild(textNode);
                ulList.appendChild(strongItem);
            }
        });
        this.items.filter(function (item, index) {
            if (typeof item !== 'object') {
                _this.items.splice(index, 1);
            }
            return item;
        });
        this.list = this.element.querySelector('.list');
        this.caret = this.element.querySelector('.caret');
        if (this.darkTheme == false) {
            this.checkTheme();
        }
        if (this.nativeSelectMode === true) {
            this.selectMode(this.nativeSelectMode);
        }
        if (this.listDisplayMode) {
            this.displayMode(this.listDisplayMode);
        }
        this.addOptionsBehaviour();
    };
    /**
     * Приватный метод рендера экземпляра класса DropDown
     * @protected
     * @method renderUrl
     * @description Рендер елементов в селекте переданных с URL и их настойка
     */
    CGSelect.prototype.renderUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, dataUrl, nativeSelect;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.items || !this.url) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fetch(this.url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        dataUrl = _a.sent();
                        nativeSelect = (0, create_elementTs_1.createNativeSelect)();
                        dataUrl.forEach(function (dataItem, index) {
                            var item = {
                                id: dataItem.id,
                                title: dataItem.title,
                                value: index
                            };
                            var ulUrl = _this.element.querySelector('.list');
                            var nativeOption = (0, create_elementTs_1.createNativeSelectOption)();
                            var liUrl = document.createElement('li');
                            var textUrl = document.createTextNode(item.title);
                            if (_this.multiselect) {
                                var checkBox = document.createElement('input');
                                checkBox.type = 'checkbox';
                                if (_this.multiselectTag) {
                                    checkBox.classList.add('displayHide');
                                }
                                checkBox.setAttribute('id', "chbox-".concat(item.id));
                                nativeSelect.setAttribute('multiple', 'multiple');
                                liUrl.appendChild(checkBox);
                            }
                            liUrl.classList.add('list__item');
                            nativeOption.value = item.title;
                            nativeOption.text = item.title;
                            nativeSelect.appendChild(nativeOption);
                            liUrl.appendChild(textUrl);
                            ulUrl.appendChild(liUrl);
                            _this.items.push(item);
                        });
                        this.element.appendChild(nativeSelect);
                        this.items.filter(function (item, index) {
                            if (typeof item !== 'object') {
                                _this.items.splice(index, 1);
                            }
                            return item;
                        });
                        this.addOptionsBehaviour();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Привaтный метод экземпляра класса DropDown
     * @method initSelected
     * @param {string} select необязательный елемент. Используется в методе selectIndex
     * @description Отрисовывает и стилизует селект
     * @protected
     */
    CGSelect.prototype.initSelected = function (select) {
        if (this.selected) {
            (0, utilsTs_1.createSelected)(this.element, this.selected);
        }
        else if (this.placeholder) {
            (0, utilsTs_1.createSelected)(this.element, this.placeholder);
        }
        else {
            if (this.language && this.language === 'ru') {
                (0, utilsTs_1.createSelected)(this.element, languageTS_1.ru.selectPlaceholder);
            }
            else {
                (0, utilsTs_1.createSelected)(this.element, languageTS_1.en.selectPlaceholder);
            }
        }
        if (select) {
            (0, utilsTs_1.createSelected)(this.element, select, this.styles);
        }
        if (this.lable) {
            var lableItem = document.createElement('h1');
            var textLable = document.createTextNode(this.lable);
            lableItem.appendChild(textLable);
            lableItem.classList.add('label');
            this.element.insertAdjacentElement('beforebegin', lableItem);
        }
        if (this.styles) {
            (0, utilsTs_1.customStyles)(this.element, this.styles);
        }
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @description Открывает и закрывает список по переданному эвенту
     * @method initEvent
     */
    CGSelect.prototype.initEvent = function () {
        var _this = this;
        if (!this.event) {
            return;
        }
        if (this.event) {
            if (this.event === 'mouseenter') {
                this.element.addEventListener(this.event, function () {
                    _this.open();
                });
                this.element.addEventListener('mouseleave', function () {
                    _this.close();
                });
            }
        }
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @param {boolean} oneClick необязательный параметр передаваемый из функции buttonControl
     * @description Открывает список для выбора элемента
     * @method open
     */
    CGSelect.prototype.open = function (oneClick) {
        if (oneClick === true) {
            this.list.classList.add('open');
            this.caret.classList.add('caret_rotate');
        }
        else {
            this.list.classList.toggle('open');
            this.caret.classList.toggle('caret_rotate');
        }
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @description Закрывает список
     * @method close
     */
    CGSelect.prototype.close = function () {
        var _a, _b;
        (_a = this.list) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
        (_b = this.caret) === null || _b === void 0 ? void 0 : _b.classList.remove('caret_rotate');
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @description Закрывает список по клику вне элемента
     * @method closeSelectClick
     */
    CGSelect.prototype.closeSelectClick = function () {
        var _this = this;
        var dropdown = document.querySelector("".concat(this.options.selector));
        document.addEventListener('click', function (e) {
            var withinBoundaries = e.composedPath().includes(dropdown);
            if (!withinBoundaries) {
                if (_this.btnCntr) {
                    return;
                }
                else {
                    _this.close();
                }
            }
        });
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @description Метод реализовывающий выбор элементов в разных режимах. Обычный/Мультиселект/Мультиселект + Мультиселект Таг.
     * @method addOptionsBehaviour
     */
    CGSelect.prototype.addOptionsBehaviour = function () {
        var _this = this;
        var _a, _b;
        var options = (_a = this.element) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.list__item');
        var select = (_b = this.element) === null || _b === void 0 ? void 0 : _b.querySelector('.selected');
        var nativeOption = this.element.querySelectorAll('.nativeSelect__nativeOption');
        var selectedItemsClear;
        var ulMultipul = document.createElement('ul');
        if (this.multiselect) {
            this.selectedItems = [];
            ulMultipul.classList.add('multiselect-tag');
            select === null || select === void 0 ? void 0 : select.classList.add('overflow-hidden');
        }
        if (this.searchMode) {
            this.searchModeSelect(this.randomId);
        }
        options === null || options === void 0 ? void 0 : options.forEach(function (option, index) {
            option.addEventListener('click', function (event) {
                if (Array.isArray(_this.selectedItems)) {
                    selectedItemsClear = {
                        placeholder: _this.placeholder,
                        selected: _this.selected,
                        selectedItems: _this.selectedItems,
                        indexes: _this.indexes,
                        darkTheme: _this.darkTheme,
                        multiselectTag: _this.multiselectTag
                    };
                }
                var item = _this.items[index];
                var checkIndex = _this.indexes.indexOf(index);
                if (_this.closeOnSelect == false || _this.multiselect) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (_this.multiselect) {
                    option.classList.toggle('active');
                    var checkBox = option.querySelector('input[type="checkbox"]');
                    if (checkBox) {
                        if (!(event.target instanceof HTMLInputElement)) {
                            checkBox.checked = !checkBox.checked;
                        }
                        if (checkIndex == -1) {
                            _this.indexes.push(index);
                            (0, utilsTs_1.nativeOptionMultiple)(nativeOption, item.title, true);
                            select.textContent = '';
                            if (_this.multiselectTag) {
                                if (Array.isArray(_this.selectedItems)) {
                                    var dataBreadCrumb = {
                                        option: _this.options,
                                        element: _this.element,
                                        indexes: _this.indexes,
                                        selectedItems: _this.selectedItems
                                    };
                                    _this.selectedItems.push(item.title);
                                    select.appendChild(ulMultipul);
                                    ulMultipul.appendChild((0, create_elementTs_1.createBreadCrumb)(dataBreadCrumb, item.title, index, item.id));
                                }
                            }
                            else {
                                if (Array.isArray(_this.selectedItems)) {
                                    _this.selectedItems.push(item.title);
                                    select.innerText = _this.selectedItems.join(',');
                                }
                            }
                        }
                        else {
                            if (_this.multiselectTag) {
                                var tagItem = document.getElementById("tag-".concat(index, "-").concat(item.id));
                                ulMultipul.removeChild(tagItem);
                            }
                            if (Array.isArray(_this.selectedItems)) {
                                _this.selectedItems.splice(checkIndex, 1);
                                _this.indexes.splice(checkIndex, 1);
                                (0, utilsTs_1.nativeOptionMultiple)(nativeOption, item.title, false);
                            }
                        }
                        if (!_this.selectedItems.length) {
                            (0, utilsTs_1.getSelectText)(selectedItemsClear, select);
                        }
                        else {
                            if (_this.multiselectTag) {
                                select.appendChild(ulMultipul);
                            }
                            else {
                                if (Array.isArray(_this.selectedItems)) {
                                    select.innerText = _this.selectedItems.join(',');
                                }
                            }
                        }
                    }
                }
                else {
                    select.textContent = item.title;
                    _this.selectedItems = item.title;
                    (0, utilsTs_1.nativeOptionOrdinary)(nativeOption, item.title);
                    options.forEach(function (option) {
                        option.classList.remove('active');
                    });
                    option.classList.add('active');
                }
                (0, utilsTs_1.clearSelect)(select, _this.element, selectedItemsClear);
            });
        });
    };
    /**
     * Приватный метод рендера экземпляра класса DropDown
     * @protected
     * @method #checkTheme
     * @description Изменяет цветовую схему с темной на светлую.
     */
    CGSelect.prototype.checkTheme = function () {
        var select = this.element.querySelector('.cg-select');
        var caret = this.element.querySelector('.caret');
        var list = this.element.querySelector('ul.list');
        var search = this.element.querySelector('.inputSearch');
        if (this.darkTheme == false) {
            select.classList.add('selectWhite');
            caret.classList.add('caretWhite');
            list.classList.add('listWhite');
            if (this.searchMode == true) {
                search.classList.add('inputWhite');
            }
        }
        else if (this.darkTheme == true) {
            return;
        }
        else {
            throw new Error('Styles error or invalid value entered!');
        }
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @param {boolean} nativeSelectMode параметр отвечающий за добавления нативного селекта.
     * @description Изменяет отображение селекта на мобильных устройствах
     * @method selectMode
     */
    CGSelect.prototype.selectMode = function (nativeSelectMode) {
        var win = window.outerWidth;
        if (nativeSelectMode === true) {
            var select = this.element.querySelector('.cg-select');
            var list = this.element.querySelector('.list');
            var nativeSelect = this.element.querySelector('.nativeSelect');
            if (win < 576) {
                select.classList.add('displayHide');
                list.classList.add('displayHide');
                nativeSelect.classList.add('nativeSelectActive');
            }
            else if (win > 576) {
                select.classList.remove('displayHide');
                list.classList.remove('displayHide');
                nativeSelect.classList.remove('nativeSelectActive');
                nativeSelect.classList.add('displayHide');
            }
        }
        else {
            return;
        }
    };
    /**
     * Метод который реализует поиск элементов в селекте
     * @protected
     * @param {string} random уникальное значение для input элемента.
     * @method searchMode
     */
    CGSelect.prototype.searchModeSelect = function (random) {
        var input = this.element.querySelector("#searchSelect-".concat(random));
        var searchSelect = this.element.querySelectorAll('.list__item');
        var result = document.createElement('p');
        var textNode;
        if (this.language && this.language === 'ru') {
            textNode = document.createTextNode("".concat(languageTS_1.ru.textInListSearch));
        }
        else {
            textNode = document.createTextNode("".concat(languageTS_1.en.textInListSearch));
        }
        result.appendChild(textNode);
        result.classList.add('displayHide');
        result.classList.add('noRezult');
        input.parentElement.appendChild(result);
        input.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        if (input instanceof HTMLInputElement) {
            input.oninput = function () {
                var valueSearch = input.value.trim().toLowerCase();
                var anyMatch = false;
                if (valueSearch != '') {
                    searchSelect.forEach(function (elem) {
                        var isMatching = new RegExp(valueSearch, 'gi').test(elem.textContent);
                        anyMatch = anyMatch || isMatching;
                        if (elem.textContent.toLowerCase().search(valueSearch) == -1) {
                            elem.classList.add('displayHide');
                        }
                        else {
                            elem.classList.remove('displayHide');
                        }
                    });
                    result.classList.toggle('displayHide', anyMatch);
                }
                else {
                    searchSelect.forEach(function (elem) {
                        elem.classList.remove('displayHide');
                        result.classList.add('displayHide');
                    });
                }
            };
        }
    };
    /**
     * Приватный метод экземпляра класса DropDown
     * @protected
     * @param {boolean} listDisplayMode параметр отвечающий за отображение выбора в виде модального окна.
     * @description Изменяет отображение листа с выбором в виде модального окна.
     * @method displayMode
     */
    CGSelect.prototype.displayMode = function (listDisplayMode) {
        if (listDisplayMode) {
            var modal_1 = document.createElement('div');
            var body_1 = document.querySelector('body');
            var list_1 = this.list;
            modal_1.appendChild(list_1);
            this.element.appendChild(modal_1);
            this.element.addEventListener('click', function () {
                modal_1.classList.toggle('modal');
                list_1.classList.toggle('listModal');
                body_1.classList.toggle('overflowHide');
            });
        }
        else {
            return;
        }
    };
    // Public methods
    /**
     * Метод экземпляра класса DropDown
     * @param {number} numberItem номер возвращаемого элемента
     * @returns {HTMLElement} возвращает ссылку на выбранный HTML элемент
     * @method getElement
     */
    CGSelect.prototype.getElement = function (numberItem) {
        if (numberItem > this.items.length) {
            return;
        }
        return this.items[numberItem];
    };
    /**
     * Метод экземпляра класса DropDown
     * @param {object} language объект в котором находятся поля для подключения языка имеет два обязательных поля placeholder, textInListSearch
     * @description метод позволяющий заменить плейсхолдер в поиске и текст который выводится если нет результата
     * @method addLanguage
     */
    CGSelect.prototype.addLanguage = function (language) {
        var placeholder = language.placeholder, textInListSearch = language.textInListSearch, selectPlaceholder = language.selectPlaceholder;
        var select = this.element.querySelector('.selected');
        var textNodeSelect = document.createTextNode(selectPlaceholder);
        select.appendChild(textNodeSelect);
        if (this.searchMode) {
            var search = this.element.querySelector('.inputSearch');
            var textNoRezult = this.element.querySelector('.noRezult');
            var textNode = document.createTextNode(textInListSearch);
            search.setAttribute('placeholder', placeholder);
            search.setAttribute('placeholder', placeholder);
            textNoRezult.textContent = '';
            textNoRezult.appendChild(textNode);
        }
    };
    /**
     * Метод экземпляра класса DropDown
     * @param {HTMLInputElement} button - HTML кнопка
     * @param {string} method - метод открытия open/close
     * @description Метод позволяющий открывать/закрывать селект с помощью кнопок
     * @method buttonControl
     */
    CGSelect.prototype.buttonControl = function (button, method) {
        var _this = this;
        if (this.listDisplayMode) {
            return;
        }
        this.btnCntr = button;
        button.addEventListener('click', function () {
            if (method.toLowerCase() === 'open') {
                _this.open(true);
            }
            else if (method.toLowerCase() === 'close') {
                _this.close();
            }
            else {
                return;
            }
        });
    };
    /**
     * Метод экземпляра класса DropDown
     * @param {boolean} value - Передаваемый параметр для добавления атрибута disabled;
     * @description Метод позволяющий переключать состояние селекта disabled,
     * @method disabled
     */
    CGSelect.prototype.disabled = function (value) {
        var select = this.element.querySelector('.cg-select');
        var nativeSelect = this.element.querySelector('.nativeSelect');
        if (value === true) {
            this.element.setAttribute('disabled', 'true');
            nativeSelect.setAttribute('disabled', 'true');
            select.classList.add('disabled');
        }
        else {
            this.element.removeAttribute('disabled');
            nativeSelect.removeAttribute('disabled');
            select.classList.remove('disabled');
        }
    };
    /**
     * Метод экземпляра класса DropDown
     * @param {string | object} item добавляемый елемент
     * @description добавляет переданный элемент в конец списка и перерисовывает список. Не может использоваться при передачи элементов с категорями
     * @method addItem
     */
    CGSelect.prototype.addItem = function (item) {
        if (this.category) {
            console.log('can`t add item to category');
            return;
        }
        if (!item) {
            return false;
        }
        var index = this.items.length;
        this.items.push((0, utilsTs_1.getFormatItem)(item, index));
        this.render();
    };
    /**
     * Метод экземпляра класса DropDown
     * @param {number} index индекс удаляемого элемента
     * @description удаляет елемент по индексу из списка и перерисовывает его. Не может использоваться при передачи элементов с категорями.
     * @method deleteItem
     */
    CGSelect.prototype.deleteItem = function (index) {
        if (this.category) {
            console.log('can`t add item to category');
            return;
        }
        var item = this.items[index];
        this.items.splice(index, 1);
        this.render();
    };
    /**
     * Метод экземпляра класса DropDown
     * @description удаляет все елементы из списка и перерисовывает его.
     * @method deleteItemAll
     */
    CGSelect.prototype.deleteItemAll = function () {
        this.items.splice(0, this.items.length);
        this.render();
    };
    /**
     * Метод экземпляра класса DropDown
     * @param {number} index индекс выбранного элемента
     * @description  выбирает элемент который будет изначально отрисовываться в селекте
     * @method selectIndex
     */
    CGSelect.prototype.selectIndex = function (index) {
        if (this.category) {
            console.log('can`t add item to category');
            return;
        }
        var options = this.element.querySelectorAll('.list__item');
        if (index > options.length) {
            return;
        }
        var select = options[index].innerText;
        this.render(select);
    };
    return CGSelect;
}());
exports.CGSelect = CGSelect;
