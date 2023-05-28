import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddnewRoutingModule } from './addnew-routing.module';
import { AddnewComponent } from './addnew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AddnewComponent
  ],
  imports: [
    CommonModule,
    AddnewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AddnewModule { }
