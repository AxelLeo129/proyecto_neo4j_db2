import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnunciosRoutingModule } from './anuncios-routing.module';
import { AnunciosComponent } from './anuncios.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AnunciosComponent
  ],
  imports: [
    CommonModule,
    AnunciosRoutingModule,
    ComponentsModule
  ]
})
export class AnunciosModule { }
