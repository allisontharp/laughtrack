import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Rating } from '../models/rating.model';
import { DatabaseService } from '../services/database/database.service';
import { OmdbService } from '../services/omdb/omdb.service';
import { SearchbarService } from '../services/searchbar/searchbar.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  searchInput: any;
  movies!: any[];
  tagName: string | undefined;
  showTag = false;
  uniqueTags: any; 
  
  constructor(
    private sb: SearchbarService,
    private omdb: OmdbService,
    private db: DatabaseService
  ) { }

  async ngOnInit(){
    this.uniqueTags = (await this.db.getMovies()).map(m => m.tags?.join()).filter((value, index, self) => self.indexOf(value) === index);
  }

  searchBar(searchText: string) {
    this.sb.searchBar(searchText);
  }

  async search(event: any){
    let regex = /\w+:.*?(?=\s+\w+:|$)/g
    var objMatch = regex.exec(this.searchInput);
    var arr = new Array();
    
    let params: {[k: string]: any} = {};
    let pair = [];
    if (this.searchInput !== undefined && objMatch === null) { // search didnt include :
      params = {title: this.searchInput}
    } else {
      while (objMatch != null) {
        arr[arr.length] = objMatch[0];
        objMatch = regex.exec(this.searchInput);
      }
      for (var i = 0; i < arr.length; i++) {
        pair = arr[i].split(':')
        params[pair[0]] = pair[1];
      }
    }
    this.movies = JSON.parse(await this.omdb.queryMovies(params)).Search
  }

  async addMovieToWatchList(imdbID: any){
    let response = JSON.parse(await this.omdb.getMovie('i='+imdbID))
    let rating: Rating = {
      source: 'IMDB',
      rating: Number(response.imdbRating),
      numberVotes: Number(response.imdbVotes)
    }
    let tags: string[] = [];
    if (this.tagName !== undefined){
      tags.push(this.tagName);
    }
    let movie: Movie = {
      title: response.Title,
      year: response.Year,
      description: response.Plot,
      image: response.Poster, 
      ratings: [rating],
      watched: 'notWatched',
      id: response.imdbID,
      director: response.Director,
      writer: response.Writer, 
      stars: response.Actors.split(','),
      runtime: response.Runtime, 
      releaseDate: response.Released,
      genres: response.Genre,
      worldwideGross: response.BoxOffice,
      tags: tags
    }
    await this.db.updateMovie(movie)
  }

  async addTag(name?: string) {
    if(name !== undefined){
      this.tagName = name;
    }
    // if (this.tagName !== undefined) {
    //   if (this.movie.tags === undefined) {
    //     this.movie.tags = [this.tagName]
    //   } else {
    //     this.movie.tags.push(this.tagName)
    //   }
    //   this.movie.tags = this.movie.tags.filter((item, i, ar) => ar.indexOf(item) == i); // Remove dupes
    //   await this.databaseService.updateMovie(this.movie);
    // }
    this.showTag = !this.showTag;
  }

}
