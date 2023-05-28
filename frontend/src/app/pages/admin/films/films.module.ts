import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    FilmsComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    ComponentsModule
  ]
})
export class FilmsModule { }
