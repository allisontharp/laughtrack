import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
}) export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    console.log(filter)
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      return items.filter((item) => {
        return checkIsFiltered(filterKeys, filter, item)
      });
    } else {
      return items;
    }
  }
}

function compare(memo: any, filter: any, keyName: string, item: any) {
  return (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === ""
}

function checkIsFiltered(filterKeys: any, filter: any, item: any) {
  return filterKeys.reduce(
    (memo: any, keyName:any) =>
    compare(memo, filter, keyName, item), true
  )
}