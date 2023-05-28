import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewComponent } from './addnew.component';

const routes: Routes = [{ path: '', component: AddnewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddnewRoutingModule { }
