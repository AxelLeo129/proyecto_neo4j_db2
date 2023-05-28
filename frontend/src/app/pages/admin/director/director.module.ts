import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { DirectorComponent } from './director.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DirectorComponent
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class DirectorModule { }
