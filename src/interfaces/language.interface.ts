/**
 * @description Settings for adding languages.
 */
export interface ILanguage {
  /**
   * Search text.
   * @type {string}
   */
  placeholder: string;
  /**
   * Default Select Text if no placeholder or selected element is specified.
   * @type {string}
   */
  selectPlaceholder: string;
  /**
   * Text if no match.
   * @type {string}
   */
  textInListSearch: string;
}
