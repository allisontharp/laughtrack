import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { Rating } from '../models/rating';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private dbService: DatabaseService
  ) { }
  

  ngOnInit(): void {
    this.movies = this.dbService.getMovies();
  }

}
