import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import {Rating} from '../models/rating.model';
import { DatabaseService } from '../services/database/database.service';

// TO DO: URL encode the title (bc of Victor/Victoria)

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor(
    private databaseService: DatabaseService
  ) { }
  @Input() movie!: Movie;
  @Input() showTags: boolean = true;
  ratings: any;
  imdbRating!: Rating;
  encodedURL!: string;
  
  ngOnInit(): void {
    this.ratings = this.movie.ratings;
    this.imdbRating = this.ratings.filter(function (rating: Rating) {
      return rating.source === 'IMDB';
    })[0]
    this.encodedURL = encodeURIComponent(this.movie.title);
  }

  async watch(){
    if (this.movie.watched == undefined || this.movie.watched == 'notWatched') {
      this.movie.watched = 'hasWatched';
      if (this.movie.dateWatched === undefined) {
        this.movie.dateWatched = [new Date()]
      }
      else {
        this.movie.dateWatched.push(new Date()); // this shouldnt happen bc there shouldnt be dates if the status is not 'hasWatched' but just in case
      }
    }
    else {
      this.movie.watched = 'notWatched';
      this.movie.dateWatched = [];
    }
    await this.databaseService.updateMovie(this.movie);
  }

}
