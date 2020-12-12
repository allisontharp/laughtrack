import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laughtrack';
  searchInput: any;

  search(event: any){
    // console.log(this.searchInput)
  }
}
