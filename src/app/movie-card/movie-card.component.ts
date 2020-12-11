import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie';
import {Rating} from '../models/rating';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor() { }
  @Input()
  movie!: Movie;
  ratings: any;
  imdbRating!: Rating;
  
  ngOnInit(): void {
    this.ratings = this.movie.ratings;
    this.imdbRating = this.ratings.filter(function (rating: Rating) {
      return rating.source === 'IMDB';
    })[0]
    console.log(this.movie);
  }

}
