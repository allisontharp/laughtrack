import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import {Rating} from '../models/rating.model';
import { DatabaseService } from '../services/database/database.service';

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
  
  ngOnInit(): void {
    this.ratings = this.movie.ratings;
    this.imdbRating = this.ratings.filter(function (rating: Rating) {
      return rating.source === 'IMDB';
    })[0]
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

}
