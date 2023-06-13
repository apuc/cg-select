# CG-SELECT

## version ~ 0.3.12

<a href="https://github.com/apuc/cg-select/blob/main/READMERU.md">ЧИТАТЬ НА РУССКОМ</a>

This component allows you to create a custom select. It offers more flexible customization and use of select.
Customization, multi-selection and live search by elements are available.

### The ability to customize basic elements, such as:

- Select button.
- List with select elements.
- Placeholder.
- In the multiselect mode, customization of chips (selected elements) is available.
- Label of the element (if it was specified).
- Switch themes from dark to light.
- The documentation also lists all the elements for catatomization using CSS.

## Installation

#### NPM

```
npm i cg-select
```

#### CDN

```
<script src="https://cdn.itguild.info/items/cg-select/latest/main.js"></script>
```
#### PHP

Repository: <a href="https://git.itguild.info/apuc/php-cg-select-v2">PHP cg-select package integration</a>

## Usage

### To create a component, you need:

1. Create a regular button element.
2. Give it the cg-dropdown class.

```
<button class="cg-dropdown"></button>
```

3. Give it a **unique class**, e.g. (cg-dropdown_categories).

```
<button class="cg-dropdown cg-dropdown_categories"></button>
```

4. Create a new instance of the class (new CGSelect)
5. Pass all desired settings as an object

#### All options for creating and managing are in the documentation, section "CGSelect class constructor".

### An example of creating a regular select.

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

### An example of initialization a CGSelect in React.

```javascript
import { useEffect } from 'react';
import CGSelect from 'cg-select';

const App = () => {
  useEffect(() => {
    const drop = new CGSelect({
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
  }, []);

  return (
    <div className="App">
      <button className="cg-dropdown cg-dropdown_selector"></button>
    </div>
  );
};
```

### An example of initialization a CGSelect in Vue.

```javascript
<template>
  <div>
    <button class="cg-dropdown cg-dropdown_selector"></button>
  </div>
</template>

<script>
import CGSelect from "cg-select";

export default {
  mounted() {
    const drop = new CGSelect({
      selector: ".cg-dropdown_selector",
      placeholder: "Выберите авто",
      items: [
        "BMW",
        {
          id: "213sade",
          title: "Opel",
          value: 1,
        },
        "Mersedes",
        "MAN",
        "Ferari",
      ],
    });
    console.log(drop);
  },
};
</script>
```

## Example of different selects

<a href="https://cg-select.itguild.info/">View live example</a>

Built-in themes are also available: dark, white. To apply them, specify the theme attribute in the select settings and pass one of the values ​​into it dark or white.

All documentation on CG-SELECT is located in the folder of the same name. The documentation describes all methods and variables, there are also examples of passing settings to select. You can also open it on the page with an example, or follow the link below.

<a href="https://cg-select.itguild.info/up_/documentation/index.html">Documentation</a>



## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Compatibility

| Application Compatibility |                                    JS                                    |                                  React                                   |                                 Angular                                 |                                   Vue                                    |
| ------------------------- | :----------------------------------------------------------------------: | :----------------------------------------------------------------------: | :---------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| CG-SELECT                 | ![image](https://github.com/apuc/cg-select/blob/main/src/images/yes.png) | ![image](https://github.com/apuc/cg-select/blob/main/src/images/yes.png) | ![image](https://github.com/apuc/cg-select/blob/main/src/images/no.png) | ![image](https://github.com/apuc/cg-select/blob/main/src/images/yes.png) |
| Comment                   |                 Tested in Js applications and it works.                  |          The select is initiated inside the `useEffect() `hook           |                            not yet available                            |           The select is initiated inside the `mounted() `hook            |

## History

16.12.2022 - release version 0.1.0!

20.01.2023 - upgrade to version 0.2.1

06.03.2023 - upgrade to version 0.3.0
