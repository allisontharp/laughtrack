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
  private sub: any;
  movieCount: number = 0;

  filters = new Map<string, string | undefined>();
  filterArray = ['title', 'year', 'watched', 'genres', 'director', 'writer', 'stars', 'tags', 'exclude']
  dropdownArray = ['watched', 'tags', 'exclude']
  uniqueTags: any;

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
  ) {
    this.sub = this.route.queryParams.subscribe(async params => {
      this.setFilters(params);
    });
  }


  async ngOnInit(): Promise<void> {
    this.movies = await this.dbService.getMovies();
    this.initalizeFilters();
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
    this.clearFilters(true);
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
    this.setFilters(params);
    this.getMovieCount();
  }

  clearFilters(keepDropdowns?: boolean) {
    if(keepDropdowns == true){
      let nonDropdownFilters = this.filterArray.filter( e => !this.dropdownArray.includes(e))
      nonDropdownFilters.forEach((filter: string) => {
        this.filters.set(filter, undefined);
      })
    } else {
      this.filterArray.forEach((filter: string) => {
        if(filter == 'exclude'){
          this.filters.set('exclude', '')
        } else {
          this.filters.set(filter, undefined);
        }
      })
    }
    this.getMovieCount();
  }

  initalizeFilters(){
    this.filterArray.forEach((filter: string) => {
      if(this.filters.get(filter) === undefined){
        this.filters.set(filter, undefined)
      }
    })
  }

  setFilters(params: any) {
    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((key: string) => { this.filters.set(key, params[key]) }
      )
    }
    this.getMovieCount();
  }

  getMovieCount() {
    let filteredMovies = this.movies;
    this.filters.forEach((value: string | undefined, key: string) => {
      if (key == 'exclude') {
        filteredMovies = filteredMovies.filter((m: any) => m['tags'] != value)
      } else if (value !== undefined) {
        filteredMovies = filteredMovies.filter((m: any) => m[key] == value || new RegExp(value, 'gi').test(m[key]));
      }
    })
    this.movieCount = filteredMovies.length;
  }


}
