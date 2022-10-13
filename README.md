# CG-SELECT

-----------------------------------------------------
This component allows you to create a generic select.
-----------------------------------------------------

Creating a Component:

  - Сreate an element with class cg-dropdown and give it a unique selector.
  ```
  <button class="cg-dropdown cg-dropdown_one"></button>
  ```
  - Create a class element.
  ```
  const dropdown = new DropDown()
  ```
  - Next, pass the desired settings
  
  --------------------------------------------------
  ## Settings
 
    options = {
        - selector: Here we pass our unique selector.  Obligatory item!!!
        - placeholder: string
        - selected: string
        - items = []
        - url: string
        - event: string
        - styles: {}
        - multiselect: boolean
        - multiselectTag: boolean
    }
  
