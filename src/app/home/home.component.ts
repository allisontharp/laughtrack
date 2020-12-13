import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { DatabaseService } from '../services/database/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filterWatched: string | undefined;
  sortByName = "title";
  sortDirection = "asc";
  data: any
  private sub: any;
  @Input() filterTitle: string | undefined;

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
  ) { 
    this.sub = this.route.queryParams.subscribe(async params => {
      this.data = params;
      if(params !== undefined){
        this.filterTitle = params['title']
      }
    });


  }


  async ngOnInit(): Promise<void> {
    this.movies = await this.dbService.getMovies();
  }

  setFilterStatus(filterName: string, status: any) {
    switch (filterName) {
      case "filterWatched": this.filterWatched = status; break;
      case "filterTitle": this.filterTitle = status; break;
    }
  }

  setSortByName(sortByName: string, sortByDirection: string) {
    this.sortByName = sortByName;
    this.sortDirection = sortByDirection;
  }

  searchBar(event: any){
    this.filterTitle = event;
  }

}