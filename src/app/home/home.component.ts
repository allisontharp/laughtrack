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
  sortByName = "AFI100LaughsRank";
  sortDirection = "desc";
  data: any
  private sub: any;
  filterTitle: string | undefined;
  filterYear: string | undefined;
  filterWatched: string | undefined;
  filterGenres: any;
  filterDirector: any;
  filterWriter: any;
  filterStars: any;
  filterCategory: any;
  filterTags: any;
  excludeTags: any = '';

  uniqueTags: any;

  constructor(
    private dbService: DatabaseService,
    private route: ActivatedRoute,
  ) {
    this.sub = this.route.queryParams.subscribe(async params => {
      this.data = params;
      if (params !== undefined) {
        this.filterTitle = params['title'];
        this.filterYear = params['year'];
        this.filterWatched = params['watched']
        this.filterGenres = params['genres']
        this.filterDirector = params['director']
        this.filterWriter = params['writer']
        this.filterStars = params['stars']
        this.filterTags = params['tags']
        this.excludeTags = params['exclude'] ? params['exclude'] : '';
    }
    });

  }


  async ngOnInit(): Promise<void> {
    this.movies = await this.dbService.getMovies();
    if (this.filterWatched === undefined) {
      this.filterWatched = "notWatched"
    }
    this.uniqueTags = this.movies.map(m => m.tags?.join()).filter((value, index, self) => self.indexOf(value) === index);
    console.log('excludetags:')
    console.log(this.excludeTags)
  }

  setFilterStatus(filterName: string, status: any) {
    switch (filterName) {
      case "filterWatched": this.filterWatched = status; break;
      case "filterTitle": this.filterTitle = status; break;
      case "filterTags": this.filterTags = status; break;
      case "excludeTags": this.excludeTags = status; break;
    }

    console.log(this.filterTags)
    console.log(this.excludeTags)
  }

  setSortByName(sortByName: string, sortByDirection: string) {
    this.sortByName = sortByName;
    this.sortDirection = sortByDirection;
    if (this.sortByName == 'AFI100LaughsRank') {
      this.filterTags = 'AFI100Laughs';
      if (this.excludeTags == 'AFI100Laughs') {
        this.excludeTags = undefined;
      }
    }
  }

  searchBar(searchText: any) {
    // Split into keyvalue pairs (title:<title> year:<year>])
    let regex = /\w+:.*?(?=\s+\w+:|$)/g
    var objMatch = regex.exec(searchText);
    var arr = new Array();

    if (searchText !== undefined && objMatch === null) { // search didnt include :
      this.filterTitle = searchText;
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

    if (params !== undefined) {
      this.filterTitle = params['title'];
      this.filterYear = params['year'];
      this.filterWatched = params['watched'];
      this.filterGenres = params['genres'];
      this.filterDirector = params['director'];
      this.filterWriter = params['writer'];
      this.filterTags = params['tags'];
      this.filterStars = params['stars'];
      this.excludeTags = params['exclude'] ? params['exclude'] : ''
    }

  }

  clearFilters() {
    this.filterTitle = undefined;
    this.filterYear = undefined;
    this.filterWatched = undefined;
    this.filterGenres = undefined;
    this.filterDirector = undefined;
    this.filterWriter = undefined;
    this.filterStars = undefined;
    this.filterTags = undefined;
    this.excludeTags = '';
  }

}