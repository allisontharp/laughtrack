import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { ActivatedRoute,  Router } from '@angular/router';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  private sub: any;
  movie!: Movie;
  showTag = false;
  tagName: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id: string;
    this.sub = this.route.params.subscribe(async params => {
      id = params['id'];
      this.movie = await this.databaseService.getMovie(id);
    });
  }

  async addTag() {
    if (this.tagName !== undefined) {
      if (this.movie.tags === undefined) {
        this.movie.tags = [this.tagName]
      } else {
        this.movie.tags.push(this.tagName)
      }
      this.movie.tags = this.movie.tags.filter((item, i, ar) => ar.indexOf(item) == i); // Remove dupes
      await this.databaseService.updateMovie(this.movie);
    }
    this.showTag = !this.showTag;
  }

  searchBar(searchText: string){
    console.log(event)
    let param = '';
    if(searchText.includes(':')){
      param = searchText
    } else {
      param = `title: ${searchText}`
    }
    this.router.navigate([''], { queryParams: { title: 'day', year: '1937' } });
  }

}

