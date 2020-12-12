import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  private sub: any;
  movie!: Movie;
  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService
  ) { }

  ngOnInit(): void {
    let id: string;
    this.sub = this.route.params.subscribe(async params => {
      id = params['id'];
      this.movie = await this.dbService.getMovie(id);
    });

  }


}
