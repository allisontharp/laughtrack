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
    this.movies = [];
    this.dynamoDbRow = <IDyanamoDb> {};
    this.dynamoDbRow.key = 'sk';
    this.dynamoDbRow.value = 'Movie'
    let r = await this.apiService.getRows(this.dynamoDbRow);
    let rows = JSON.parse(r)
    rows.result.forEach((m: any) => {
      let j = JSON.parse(m.jsonObject)
      j['AFI100LaughsRank'] = Number(j['AFI100LaughsRank'])
      this.movies.push(j)
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

  async updateMovie(movie: Movie){
    this.dynamoDbRow = <IDyanamoDb> {};
    this.dynamoDbRow.pk = movie.title;
    this.dynamoDbRow.sk = 'Movie'
    this.dynamoDbRow.jsonObject = JSON.stringify(movie)

    let r = await this.apiService.insertRow(this.dynamoDbRow)
  }
}
