import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    SimulationComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule,
    ComponentsModule
  ]
})
export class SimulationModule { }
