import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDyanamoDb } from 'src/app/models/dynamoDb.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.dynamoDbApiUrl;
  }

  insertRow(dynamoDbRow: IDyanamoDb): any{
    const url = this.apiUrl + '/insertRow';
    return this.http.post(url, dynamoDbRow, {responseType: 'text'}).toPromise();
  }

  getRows(dynamoDbRow: IDyanamoDb): any{
    const url = this.apiUrl + '/getRows';
    return this.http.post(url, dynamoDbRow, {responseType: 'text'}).toPromise();
  }

  getMovieFromIMDB(title:string): any{
    const url = this.apiUrl + '/getMovieFromIMDB';
    let body = {
      title: title
    }
    return this.http.post(url, body, {responseType: 'text'}).toPromise();
  }

  addToNomie(title:string, rating: number, date: any){
    const url = environment.nomieUrl;
    let body = {
      note: `#movie(${rating}) ${title}`,
      api_key: environment.nomieKey,
      date: {date}
    }
    return this.http.post(url, body, {responseType: 'text'}).toPromise();
  }

}