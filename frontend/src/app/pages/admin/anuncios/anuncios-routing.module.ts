import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunciosComponent } from './anuncios.component';

const routes: Routes = [{ path: '', component: AnunciosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnunciosRoutingModule { }
