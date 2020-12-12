import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { ApiService } from '../services/api/api.service';
import { IDyanamoDb } from '../models/dynamoDb.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DatabaseService } from '../services/database/database.service';
@Component({
  selector: 'app-logger-card',
  templateUrl: './logger-card.component.html',
  styleUrls: ['./logger-card.component.css']
})
export class LoggerCardComponent implements OnInit {
  alRate = 0;
  troyRate = 0;
  @Input() movie!: Movie;
  hasWatched: string | undefined;
  str: any;
  dynamoDbRow: IDyanamoDb = <IDyanamoDb> {};

  constructor(
    private apiService: ApiService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    if(this.movie.ratings !== undefined){
      let alRating = this.movie.ratings.filter((rating) => rating.source == 'Allison')
      let troyRating = this.movie.ratings.filter((rating) => rating.source == 'Troy')
      if(alRating.length > 0){
        this.alRate = alRating[0].rating;
      }
      if(troyRating.length > 0){
        this.troyRate = troyRating[0].rating;
      }
    }
  };

  async commentSubmit(){
    // console.log(this.str)
    // var j = JSON.stringify(this.movie)
    // console.log(j)

    // // InsertRow
    // this.dynamoDbRow.pk = this.movie.title;
    // this.dynamoDbRow.sk = 'Movie';
    // this.dynamoDbRow.jsonObject = j;

    // this.apiService.insertRow(this.dynamoDbRow)

  }

  async watch(){
    if(this.movie.watched == undefined || this.movie.watched == 'notWatched'){
      this.movie.watched = 'hasWatched';
    }
    else{
      this.movie.watched = 'notWatched';
    }

    console.log(this.movie);

    await this.databaseService.updateMovie(this.movie);
  }

  async updateRating(person: any, rating: any){
    if(this.movie.ratings !== undefined){
      let r = this.movie.ratings.filter((r) => r.source == person)[0];
      r.rating = rating;
      
    }

    console.log(this.movie);

    await this.databaseService.updateMovie(this.movie);
  }



}
