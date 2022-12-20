# CG-SELECT

## version ~ 0.0.1

Этот компонент позволяет создать кастомный селект. Он предлагает более гибкую настройку и использование селекта.
Доступна кастомизация, мультивыбор и живой поиск по елементам.

### Доступна возможность кастомизации основных элементов, таких как:

- Кнопка селекта.
- Список c элементами селекта.
- Placeholder.
- При режиме мультиселект доступна кастомизация chips(выбранных эл-ов).
- Label элемента(если он был указан)
- Переключение тем с темной на светлую

## Installation

TODO: Describe the installation process

## Usage

### Для создания компонета нужно:

1. Создать обычный button елемент.
2. Присвоить ему класс cg-dropdown.

```
<button class="cg-dropdown"></button>
```

3. Присвоить ему **уникальный класс**, например(cg-dropdown_categories)

```
<button class="cg-dropdown cg-dropdown_categories"></button>
```

4. Создать новый экземпляр класса(new DropDown)
5. Передать все желаемые настройки как объект

#### Все опции для создания и управления находятся в документации, раздел "Конструктор класса DropDown".

### Пример создния обычного селекта

```javascript
import { DropDown } from './cg-dropdown';

const dropdown = new DropDown({
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

## Примеры разных селектов

Так же рабочий пример -- https://cg-select.itguild.info/

![image](https://github.com/apuc/cg-select/blob/main/src/images/DefaultSelect.png)
![image](https://github.com/apuc/cg-select/blob/main/src/images/MultiSelect.png)
![image](https://github.com/apuc/cg-select/blob/main/src/images/WhiteTheme.png)
![image](https://github.com/apuc/cg-select/blob/main/src/images/Categories.png)

Вся документация по CG-SELECT находится в одноименной папке. В документации описаны все методы и переменные, также есть примеры передачи настроек в select.

**Чтобы ознакомиться с ней, перейдите по ссылке -** https://maxovs19.github.io/cg-select/up_/documentation/index.html

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history
