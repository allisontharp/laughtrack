import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { Rating } from '../models/rating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  movies: Movie[] = [{
    title: 'Good Morning, Vietnam', year: 1987, description: `In 1965, an unorthodox and irreverent DJ named Adrian Cronauer begins to shake up things
  when he is assigned to the U.S. Armed Services radio station in Vietnam.`
    , image: '../../assets/afi100.jpg'
    , ratings: [{ source: 'IMDB', rating: 7.3, numberVotes: 125005 }, { source: 'Allison', rating:7, numberVotes: 1 }, { source: 'Troy', rating: 7, numberVotes: 1 }]
  },
  {
    title: 'The Nutty Professor', year: 1963, description: `A timid, nearsighted chemistry teacher discovers a magical potion that can transform him into a suave and handsome Romeo. 
  The Jekyll and Hyde game works well enough until the concoction starts to wear off at the most embarrassing times. `
    , image: '../../assets/afi99.jpg'
    , ratings: [{ source: 'IMDB', rating: 6.7, numberVotes: 15332 }, { source: 'Allison', rating: 4, numberVotes: 1 }]
  },
  {
    title: 'The Court Jester', year: 1956, description: `A hapless carnival performer masquerades as the court jester as part of a plot against an evil ruler who has overthrown the rightful King. `
    , image: '../../assets/afi98.jpg'
    , ratings: [{ source: 'IMDB', rating: 7.9, numberVotes: 11526 }, { source: 'Allison', rating: 6, numberVotes: 1 }, { source: 'Troy', rating: 7, numberVotes: 1 }]
  }]

  ngOnInit(): void {
  }

}
