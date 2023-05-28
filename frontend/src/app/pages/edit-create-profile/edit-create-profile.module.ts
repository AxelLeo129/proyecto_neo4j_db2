import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCreateProfileRoutingModule } from './edit-create-profile-routing.module';
import { EditCreateProfileComponent } from './edit-create-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditCreateProfileComponent
  ],
  imports: [
    CommonModule,
    EditCreateProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class EditCreateProfileModule { }
