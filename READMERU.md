# CG-SELECT

## Версия ~ 0.2.6

<a href="https://github.com/apuc/cg-select/blob/main/README.md">English README</a>

Этот компонент позволяет вам создать пользовательский Select. Он предлагает более гибкую настройку и использование select.
Доступна кастомизация, multi-selection, живой поиск по элементам и многое другое.

### Возможность настройки основных элементов, таких как:

- Кнопка самого селекта Select.
- Список с выбранными элементами.
- Placeholder.
- В режиме мультиселекта доступна кастомизация chips (выбранных элементов).
- Label элемента (если она была указана).
- Переключить тему с темной на светлую.
- Так же в документации указанны все элементы для катомизации с помощью CSS.

## Установка

```
npm i cg-select
```

## Использование

### Для создания компонента необходимо:

1. Создайте обычную кнопку.
2. Добавьте ей класс cg-dropdown.

```
<button class="cg-dropdown"></button>
```

3. Добавьте ему **уникальный класс**,
   например: (cg-dropdown_categories)

```
<button class="cg-dropdown cg-dropdown_categories"></button>
```

4. Создайте новый экземпляр класса (new CGSelect)
5. Передайте все нужные настройки как объект.

#### Все варианты создания и управления селектом есть в документации, раздел "Конструктор класса CGSelect".

### Пример создания обычного CGSelect.

```javascript
import CGSelect from 'cg-select';

const dropdown = new CGSelect({
  selector: '.cg-dropdown_selector',
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
    'Ferari',
  ],
});
```

## Примеры различных вариантов выбора.

<a href="https://cg-select.itguild.info/">Рабочий пример</a>

Вся документация по CG-SELECT находится в одноименной папке. В документации описаны все методы и переменные, также есть примеры передачи настроек в CGSelect. Вы также можете открыть его на странице с примером, или перейти по ссылке ниже.

<a href="https://cg-select.itguild.info/up_/documentation/index.html">Документация</a>

## Содействие

1. Сделайте Fork!
2. Создайте свою ветку: `git checkout -b my-new-feature`
3. Зафиксируйте свои изменения: `git commit -am 'Add some feature'`
4. Загрузите ветку: `git push origin my-new-feature`
5. Отправте запрос на вытягивание изменений :D

## Совместимость

| Совместимость в приложениях |                                    JS                                    |                                                                      React                                                                       |                                 Angular                                 |                                   Vue                                   |
| --------------------------- | :----------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------: | :---------------------------------------------------------------------: |
| CG-SELECT                   | ![image](https://github.com/apuc/cg-select/blob/main/src/images/yes.png) | ![image](https://github.com/apuc/cg-select/blob/main/src/images/yes.png) ![image](https://github.com/apuc/cg-select/blob/main/src/images/no.png) | ![image](https://github.com/apuc/cg-select/blob/main/src/images/no.png) | ![image](https://github.com/apuc/cg-select/blob/main/src/images/no.png) |
| Комментарий                 |                     Протестировано в Js приложениях                      |                                                 Работает только с костылем в виде `setTimeout()`                                                 |                             пока недоступно                             |                             пока недоступно                             |

## История

16.12.2022 - release version 0.1.0!

20.01.2023 - upgrade to version 0.2.1
