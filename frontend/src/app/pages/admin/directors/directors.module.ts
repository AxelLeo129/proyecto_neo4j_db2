import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorsRoutingModule } from './directors-routing.module';
import { DirectorsComponent } from './directors.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DirectorsComponent
  ],
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    ComponentsModule
  ]
})
export class DirectorsModule { }
