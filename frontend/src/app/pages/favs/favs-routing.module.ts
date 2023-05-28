import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavsComponent } from './favs.component';

const routes: Routes = [{ path: '', component: FavsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavsRoutingModule { }
