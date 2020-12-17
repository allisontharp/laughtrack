import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { DatabaseService } from '../services/database/database.service';
import { SearchbarService } from '../services/searchbar/searchbar.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {
  movies: Movie[] | undefined;
  watchedMovies: Movie[] | undefined;
  totalMoviesWatched: Number | undefined;
  totalTimeWatched: {[k: string]: any} = {};

  constructor(
    private dbService: DatabaseService,
    private sb: SearchbarService

  ) { }

  async ngOnInit(): Promise<void> {
    this.movies = await this.dbService.getMovies();
    if(this.movies !== undefined){
      this.watchedMovies = this.movies?.filter((m) => m.watched == 'hasWatched');
      this.totalMoviesWatched = this.watchedMovies.length;
      this.totalTimeWatched.minutes = this.watchedMovies.map(r => r.runtime?Number(r.runtime):0).reduce((acc, cur) => acc+cur)
      this.totalTimeWatched.hours = (this.totalTimeWatched.minutes/60).toFixed(2)
      
    }
  }

  searchBar(searchText: string) {
    this.sb.searchBar(searchText)
  }



}
