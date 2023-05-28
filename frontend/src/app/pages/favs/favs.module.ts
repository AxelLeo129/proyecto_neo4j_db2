import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavsRoutingModule } from './favs-routing.module';
import { FavsComponent } from './favs.component';


@NgModule({
  declarations: [
    FavsComponent
  ],
  imports: [
    CommonModule,
    FavsRoutingModule
  ]
})
export class FavsModule { }
