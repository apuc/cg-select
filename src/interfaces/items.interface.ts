export interface IItems {
  /**
   * Уникальное ID элемента
   * @type {string}
   */
  id: string;
  /**
   * Текстовое значение элемента
   * @type {string}
   */
  title: string;
  /**
   * Порядковый номер, или другая информация
   * @type {number | string}
   */
  value: number | string;
}
