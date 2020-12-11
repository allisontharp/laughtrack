import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie';

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
  constructor(
  ) { }

  ngOnInit() {
    if(this.movie.ratings !== undefined){
      let alRating = this.movie.ratings.filter((rating) => rating.source == 'Allison')
      let troyRating = this.movie.ratings.filter((rating) => rating.source == 'Troy')
      console.log(alRating);
      console.log(troyRating)
      if(alRating.length > 0){
        this.alRate = alRating[0].rating;
      }
      if(troyRating.length > 0){
        this.troyRate = troyRating[0].rating;
      }
    }
  };

}
