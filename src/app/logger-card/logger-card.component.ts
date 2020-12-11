import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logger-card',
  templateUrl: './logger-card.component.html',
  styleUrls: ['./logger-card.component.css']
})
export class LoggerCardComponent implements OnInit {
  currentRate = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
