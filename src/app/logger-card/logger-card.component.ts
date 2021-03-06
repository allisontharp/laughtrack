import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { IDyanamoDb } from '../models/dynamoDb.model';
import { DatabaseService } from '../services/database/database.service';
import { formatDate } from '@angular/common';
import { ApiService } from '../services/api/api.service';

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
  commenter: string = '';
  dynamoDbRow: IDyanamoDb = <IDyanamoDb>{};
  addWatchHistoryDate: Date | undefined;
  showAddHistory = false;
  justWatched = false;
  justRated: number | undefined;


  constructor(
    private databaseService: DatabaseService,
    private apiService: ApiService,
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
      let c = ''
      if (this.commenter !== '') {
        c = `${this.commenter} - `
      }
      let today = Date.now()
      this.comment = `${c}${formatDate(new Date(), 'yyyy/MM/dd', 'en')} - ${this.comment}`
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
      if (this.movie.dateWatched === undefined) {
        this.movie.dateWatched = [new Date()]
      }
      else {
        this.movie.dateWatched.push(new Date()); // this shouldnt happen bc there shouldnt be dates if the status is not 'hasWatched' but just in case
      }
      this.justWatched = true;
      if (this.justRated !== undefined) {
        this.addToNomie();
      }
    }
    else {
      this.movie.watched = 'notWatched';
      this.movie.dateWatched = [];
    }
    await this.databaseService.updateMovie(this.movie);
  }

  async updateRating(person: any, rating: any) {
    if (this.movie.ratings !== undefined) {
      let personRating = this.movie.ratings.filter((r) => r.source == person);
      if (personRating.length > 0) {
        personRating[0].rating = rating
      } else {
        this.movie.ratings.push({
          source: person,
          rating: rating
        })

      }
      this.justRated = this.movie.ratings.filter((r) => r.source == 'Allison')[0].rating;
      if (this.justWatched) {
        this.addToNomie();
      }
    }
    await this.databaseService.updateMovie(this.movie);
  }

  setCommentAs(commenter: string) {
    this.commenter = commenter;
  }

  async addWatchHistory() {
    if (this.addWatchHistoryDate !== undefined) {
      if (this.movie.dateWatched == undefined) {
        this.movie.dateWatched = [this.addWatchHistoryDate]
      } else {
        this.movie.dateWatched.push(this.addWatchHistoryDate);
        this.justWatched = false;
      }
      this.movie.dateWatched = this.movie.dateWatched.filter((item, i, ar) => ar.indexOf(item) == i); // Remove dupes
      if (this.movie.watched === undefined || this.movie.watched == 'NotWatched') {
        this.movie.watched = 'hasWatched';
        this.justWatched = true;
        if (this.justRated !== undefined) {
          this.addToNomie();
        }
      }
      await this.databaseService.updateMovie(this.movie);


    }
    this.showAddHistory = !this.showAddHistory;
  }

  async removeDateWatched(date: any) {
    if (this.movie.dateWatched !== undefined) {
      this.movie.dateWatched = this.movie.dateWatched.filter((item) => item != date);
      if (this.movie.dateWatched.length == 0) {
        this.movie.watched = 'NotWatched';
      }
      await this.databaseService.updateMovie(this.movie);
    }
  }

  async addToNomie() {
    await this.apiService.addToNomie(this.movie.title, this.justRated ? this.justRated : 0, Date.now());
  }



}
