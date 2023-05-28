import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSerieComponent } from './movie-serie.component';

const routes: Routes = [{ path: '', component: MovieSerieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieSerieRoutingModule { }
