import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { IDyanamoDb } from '../models/dynamoDb.model';
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
  comment: any;
  dynamoDbRow: IDyanamoDb = <IDyanamoDb>{};

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    if (this.movie.ratings !== undefined) {
      let alRating = this.movie.ratings.filter((rating) => rating.source == 'Allison')
      let troyRating = this.movie.ratings.filter((rating) => rating.source == 'Troy')
      if (alRating.length > 0) {
        this.alRate = alRating[0].rating;
      }
      if (troyRating.length > 0) {
        this.troyRate = troyRating[0].rating;
      }
    }
  };

  async commentSubmit() {
    if (this.comment !== undefined) {
      if (this.movie.comments === undefined) {
        this.movie.comments = [this.comment];
      } else {
        this.movie.comments.push(this.comment);
      }
      await this.databaseService.updateMovie(this.movie);
    }
    this.comment = undefined;
  }

  async watch() {
    if (this.movie.watched == undefined || this.movie.watched == 'notWatched') {
      this.movie.watched = 'hasWatched';
    }
    else {
      this.movie.watched = 'notWatched';
    }
    await this.databaseService.updateMovie(this.movie);
  }

  async updateRating(person: any, rating: any) {
    if (this.movie.ratings !== undefined) {
      let personRating = this.movie.ratings.filter((r) => r.source == person);
      if(personRating.length > 0){
        personRating[0].rating = rating
      } else {
        this.movie.ratings.push({
          source: person,
          rating: rating
        })
      }
    }
    await this.databaseService.updateMovie(this.movie);
  }



}
