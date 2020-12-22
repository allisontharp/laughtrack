import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  constructor(
    private router: Router

  ) { }

  searchBar(searchText: string) {
    let regex = /\w+:.*?(?=\s+\w+:|$)/g
    var objMatch = regex.exec(searchText);
    var arr = new Array();

    
    let params: {[k: string]: any} = {};
    let pair = [];
    if (searchText !== undefined && objMatch === null) { // search didnt include :
      params = {title: searchText}
    } else {
      while (objMatch != null) {
        arr[arr.length] = objMatch[0];
        objMatch = regex.exec(searchText);
      }
      for (var i = 0; i < arr.length; i++) {
        pair = arr[i].split(':')
        params[pair[0]] = pair[1];
      }
    }
    console.log(params);

    this.router.navigate([''], { queryParams: params });
  }
}
