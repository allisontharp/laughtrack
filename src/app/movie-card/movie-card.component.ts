import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import {Rating} from '../models/rating.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor() { }
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

}
