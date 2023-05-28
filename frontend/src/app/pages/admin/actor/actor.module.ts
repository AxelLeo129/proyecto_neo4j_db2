import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorRoutingModule } from './actor-routing.module';
import { ActorComponent } from './actor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ActorComponent
  ],
  imports: [
    CommonModule,
    ActorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ActorModule { }
