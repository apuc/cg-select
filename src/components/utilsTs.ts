import { IItems } from '../interfaces/items.interface';

interface IDataItem{
    category?: string;
    categoryItems?: string;
    ItemValue: IItems | string | number;
}

/**
 * Преобразование каждого елемента полученного из поля Items;
 * @param {object | string} dataItem полученный елемент переданный при создании селекта может быть как object/string
 * @param {number} index индекс этого элемента
 * @returns {object} возвращает сформированный объект
 */

export function getFormatItem(dataItem:IDataItem, index: number) {
  const random = Math.random().toString(36).substring(2, 10);
  let item: IItems;

//   if (checkItemStruct(dataItem)) {
//     item = {
//       id: dataItem.id,
//       title: dataItem.title,
//       value: index,
//     };
//   } else {
//     item = {
//       id: random,
//       title: dataItem,
//       value: index,
//     };
//   }

//   return item;
}

/**
 * Проверка содержит ли item  указанные свойства,
 * @param {object} item проверяемый на определенную структуру элемент
 * @returns {boolean} возвращает true/false если item содержит указанные свойства
 */
export function checkItemStruct(item: object): boolean {
  if (item && typeof item !== 'object') {
    return false;
  }

  return item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value');
}
