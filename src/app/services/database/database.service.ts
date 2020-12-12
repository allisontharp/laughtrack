import { Injectable } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { IDyanamoDb } from 'src/app/models/dynamoDb.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  dynamoDbRow: IDyanamoDb = <IDyanamoDb> {};

  movies: Movie[] = [];
  constructor(
    private apiService: ApiService
  ) { }

  async getMovies(){
    this.dynamoDbRow = <IDyanamoDb> {};
    this.dynamoDbRow.key = 'sk';
    this.dynamoDbRow.value = 'Movie'
    let r = await this.apiService.getRows(this.dynamoDbRow);
    let rows = JSON.parse(r)
    rows.result.forEach((m: any) => {
      this.movies.push(JSON.parse(m.jsonObject))
    });
    return this.movies;
  }

  async getMovie(title: string){
    this.dynamoDbRow = <IDyanamoDb> {};
    this.dynamoDbRow.key = 'pk';
    this.dynamoDbRow.value = title;
    let r = await this.apiService.getRows(this.dynamoDbRow);
    let rows = JSON.parse(r)
    return JSON.parse(rows.result[0].jsonObject)
  }
}
