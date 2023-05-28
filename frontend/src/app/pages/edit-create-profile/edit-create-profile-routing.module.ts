import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCreateProfileComponent } from './edit-create-profile.component';

const routes: Routes = [{ path: '', component: EditCreateProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCreateProfileRoutingModule { }
