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
  
  ngOnInit(): void {
    this.ratings = this.movie.ratings;
  }

}
