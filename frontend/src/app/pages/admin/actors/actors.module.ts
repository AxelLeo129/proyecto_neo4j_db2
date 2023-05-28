import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsRoutingModule } from './actors-routing.module';
import { ActorsComponent } from './actors.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ActorsComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule,
    ComponentsModule
  ]
})
export class ActorsModule { }
