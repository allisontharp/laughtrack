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
  sortByName: string | undefined;
  sortDirection: string | undefined;
  data: any
  private sub: any;
  movieCount: number = 0;

  filters = new Map<string, string | undefined>();
  uniqueTags: any;

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
  ) {
    this.setFilters();
  }


  async ngOnInit(): Promise<void> {
    this.movies = await this.dbService.getMovies();
    if (this.filters.get('watched') === undefined) {
      this.filters.set('watched', 'notWatched')
    }
    if (this.sortByName === undefined) {
      this.sortByName = 'AFI100LaughsRank'
      this.sortDirection = 'desc'
      this.filters.set('tags', 'AFI100Laughs')
    }
    if (this.filters.get('exclude') === undefined) {
      this.filters.set('exclude', '')
    }
    this.uniqueTags = this.movies.map(m => m.tags?.join()).filter((value, index, self) => self.indexOf(value) === index);
    this.getMovieCount();
  }

  setFilterStatus(filterName: string, status: any) {
    this.filters.set(filterName, status);
    this.getMovieCount();
  }

  setSortByName(sortByName: string, sortByDirection: string) {
    this.sortByName = sortByName;
    this.sortDirection = sortByDirection;
    if (this.sortByName == 'AFI100LaughsRank') {
      this.filters.set('tags', 'AFI100Laughs');
      if (this.filters.get('exclude') == 'AFI100Laughs') {
        this.filters.set('exclude', undefined);
      }
    }
  }

  searchBar(searchText: any) {
    // Split into keyvalue pairs (title:<title> year:<year>])
    let regex = /\w+:.*?(?=\s+\w+:|$)/g
    var objMatch = regex.exec(searchText);
    var arr = new Array();

    if (searchText !== undefined && objMatch === null) { // search didnt include :
      this.filters.set('title', searchText);
      return
    }

    let params: { [k: string]: any } = {};
    let pair = [];
    while (objMatch != null) {
      arr[arr.length] = objMatch[0];
      objMatch = regex.exec(searchText);
    }
    for (var i = 0; i < arr.length; i++) {
      pair = arr[i].split(':')
      params[pair[0]] = pair[1];
    }

    this.setFilters();

  }

  clearFilters() {
    this.filters.set('title', undefined)
    this.filters.set('title', undefined);
    this.filters.set('year', undefined);
    this.filters.set('watched', undefined);
    this.filters.set('genres', undefined);
    this.filters.set('director', undefined);
    this.filters.set('writer', undefined);
    this.filters.set('stars', undefined);
    this.filters.set('tags', undefined);
    this.filters.set('exclude', '');
    this.getMovieCount();
  }

  setFilters() {
    this.sub = this.route.queryParams.subscribe(async params => {
      this.data = params;
      if (params !== undefined) {
        this.filters.forEach((value: string | undefined, key: string) => { this.filters.set(key, params[key]) }
        )
      }
    });
    this.getMovieCount();
  }

  getMovieCount() {
    let filteredMovies = this.movies;
    this.filters.forEach((value: string | undefined, key: string) => {
      console.log(key, value)
      if(key == 'exclude'){
        filteredMovies = filteredMovies.filter((m: any) => m['tags'] != value)
      }else if(value !== undefined){
        filteredMovies = filteredMovies.filter((m: any) => m[key] == value);
      }
      console.log(filteredMovies.length)
    })
    this.movieCount = filteredMovies.length;
  }

  
}
