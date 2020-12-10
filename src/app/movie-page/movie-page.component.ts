import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
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
  currentRate = 0;
  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService
  ) { }

  ngOnInit(): void {
    let id: number;
    this.sub = this.route.params.subscribe(params => {
      id = params['id'];
      this.movie = this.dbService.getMovie(id);
    });

  }

}
