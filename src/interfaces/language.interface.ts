/**
 * @description Настройки для добавления языков.
 */
export interface ILanguage {
  /**
   * Текст в поиске.
   * @type {string}
   */
  placeholder: string;
  /**
   * Дефолтный Текст Селекта если не указан placeholder или выбранный элемент
   * @type {string}
   */
  selectPlaceholder: string;
  /**
   * Текст если совпадений нет.
   * @type {string}
   */
  textInListSearch: string;
}
