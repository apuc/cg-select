
/**
 * Метод который создает нативный селект
 * @returns {HTMLSelectElement} Возвращает созданный нативный селект
 */

export function createNativeSelect(): HTMLSelectElement {
    const nativeSelect = document.createElement('select');
  
    nativeSelect.setAttribute('name', 'dataSelect');
    nativeSelect.classList.add('nativeSelect');
    return nativeSelect;
}

/**
 * Метод который создает Options для нативного селекта
 * @returns {HTMLOptionElement} Возвращает созданные Options нативного селекта
 */
export function createNativeSelectOption(): HTMLOptionElement {
    const nativeOption = document.createElement('option');
  
    nativeOption.classList.add('nativeSelect__nativeOption');
    return nativeOption;
}
  