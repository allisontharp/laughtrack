import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {
  searchInput: any;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }


  search(event: any){
    console.log(event)
    console.log(this.searchInput)
    this.newItemEvent.emit(this.searchInput);
  }
}
