import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDyanamoDb } from 'src/app/models/dynamoDb.model';
@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.omdbApiUrl;
  }

  queryMovies(params: any){
    console.log(params)
    let url = this.apiUrl + '&s=' + params['title'] + '&type=movie'
    if(params['year'])
    {
      console.log(params['year'])
      url += '&y=' + params['year']
    }
    console.log(url)
    return this.http.get(url, {responseType: 'text'}).toPromise();
  }

  getMovie(title: string){
    const url = this.apiUrl + '&' + title
    return this.http.get(url, {responseType: 'text'}).toPromise();
  }
}
