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
  @Input() filterTitle: string | undefined;
  @Input() filterYear: string | undefined;
  @Input() filterWatched: string | undefined;
  @Input() filterGenres: any;
  @Input() filterDirector: any;
  @Input() filterWriter: any;
  @Input() filterStars: any;

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
      }
    });

  }


  async ngOnInit(): Promise<void> {
    this.movies = await this.dbService.getMovies();
    if(this.filterWatched === undefined){
      this.filterWatched = "notWatched"
    }
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

  searchBar(searchText: any) {
    // Split into keyvalue pairs (title:<title> year:<year>])
    let regex = /\w+:.*?(?=\s+\w+:|$)/g
    var objMatch = regex.exec(searchText);
    var arr = new Array();

    if(searchText !== undefined && objMatch === null){ // search didnt include :
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
      this.filterStars = params['stars'];
    } 
  }

  clearFilters(){
    this.filterTitle = undefined;
    this.filterYear = undefined;
    this.filterWatched = undefined;
    this.filterGenres = undefined;
    this.filterDirector = undefined;
    this.filterWriter = undefined;
    this.filterStars = undefined;
  }

}