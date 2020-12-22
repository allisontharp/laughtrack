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

  constructor(
    private sb: SearchbarService,
    private omdb: OmdbService,
    private db: DatabaseService
  ) { }

  ngOnInit(){
  }

  searchBar(searchText: string) {
    this.sb.searchBar(searchText);
  }

  async search(event: any){
    this.movies = JSON.parse(await this.omdb.queryMovies(this.searchInput)).Search
  }

  async addMovieToWatchList(imdbID: any){
    let response = JSON.parse(await this.omdb.getMovie('i='+imdbID))
    let rating: Rating = {
      source: 'IMDB',
      rating: Number(response.imdbRating),
      numberVotes: Number(response.imdbVotes)
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
      worldwideGross: response.BoxOffice
    }

    await this.db.updateMovie(movie)
  }

}
