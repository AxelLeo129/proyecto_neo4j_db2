import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from './anuncio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AnuncioComponent
  ],
  imports: [
    CommonModule,
    AnuncioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AnuncioModule { }
