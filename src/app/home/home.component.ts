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
  sortByName = "title";
  sortDirection = "asc";
  data: any
  private sub: any;
  @Input() filterTitle: string | undefined;
  @Input() filterYear: string | undefined;
  @Input() filterWatched: string | undefined;

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

  searchBar(searchText: any) {
    // this.filterTitle = event;
    let regex = /\w+:.*?(?=\s+\w+:|$)/g
    var objMatch = regex.exec(searchText);
    var arr = new Array();

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
      this.filterWatched = params['watched']
    }
  }

}