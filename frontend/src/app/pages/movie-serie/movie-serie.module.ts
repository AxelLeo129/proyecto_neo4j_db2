import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieSerieRoutingModule } from './movie-serie-routing.module';
import { MovieSerieComponent } from './movie-serie.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  declarations: [
    MovieSerieComponent,
    SafeUrlPipe
  ],
  imports: [
    NgxYoutubePlayerModule.forRoot(),
    CommonModule,
    MovieSerieRoutingModule,
    ComponentsModule
  ]
})
export class MovieSerieModule { }
