import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';

const routes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'Movie/:id', component: MoviePageComponent},
  { path: 'Reports', component: ReportsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
