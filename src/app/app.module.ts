import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { LoggerCardComponent } from './logger-card/logger-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SortPipe } from './pipes/sort/sort.pipe';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { AddmovieComponent } from './addmovie/addmovie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    MoviePageComponent,
    FilterPipe,
    LoggerCardComponent,
    SortPipe,
    HeaderbarComponent,
    ReportsPageComponent,
    AddmovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
