import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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

}