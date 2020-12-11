import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
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
  filterWatched: string | undefined;
  filterRating: number | undefined;

  constructor(
    private dbService: DatabaseService
  ) { }


  ngOnInit(): void {
    this.movies = this.dbService.getMovies();
  }

  setFilterStatus(filterName: string, status: any) {
    switch (filterName) {
      case "filterWatched": this.filterWatched = status; break;
      case "filterRating": this.filterRating = status; break;
    }
  }

}
