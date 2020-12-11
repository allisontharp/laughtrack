import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
}) export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      console.log('filter')
      console.log(filter)
      console.log('filterKeys')
      console.log(filterKeys)
      console.log('items:')
      console.log(items)
      return items.filter((item) => {
        var x = r(filterKeys, filter, item)
        console.log('x')
        console.log(x)
        return x
      });
    } else {
      return items;
    }
  }
}

function wtf(memo: any, filter: any, keyName: string, item: any) {
  console.log(`memo: ${JSON.stringify(memo)}`)
  console.log(`keyName: ${keyName}`)
  console.log(`keyValue: ${filter[keyName]}`)
  console.log(new RegExp(filter[keyName], 'gi').test(item[keyName]))
  console.log('result:')
  console.log((memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "")
  console.log('item:')
  console.log(item)
  return (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === ""
}

function r(filterKeys: any, filter: any, item: any) {
  return filterKeys.reduce(
    (memo: any, keyName:any) =>
      wtf(memo, filter, keyName, item), true
  )
}