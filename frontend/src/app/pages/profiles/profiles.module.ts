import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ComponentsModule
  ]
})
export class ProfilesModule { }
