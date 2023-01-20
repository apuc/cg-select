/**
 * @description Element structure.
 */
export interface IItems {
  /**
   * Unique item ID.
   * @type {string}
   */
  id: string;
  /**
   * Element text value.
   * @type {string}
   */
  title: string;
  /**
   * Sequence number, or other information.
   * @type {number | string}
   */
  value: number | string;
}
