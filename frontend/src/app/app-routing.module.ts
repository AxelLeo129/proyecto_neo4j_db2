import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  AdminGuard
} from './guards/admin.guard';
import {
  ClientGuard
} from './guards/client.guard';

const routes: Routes = [{
    path: '',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'profiles',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'admin/users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'admin/user',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin/user/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin/film',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/addnew/addnew.module').then(m => m.AddnewModule)
  },
  {
    path: 'admin/film/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/addnew/addnew.module').then(m => m.AddnewModule)
  },
  {
    path: 'home',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'favs',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/favs/favs.module').then(m => m.FavsModule)
  },
  {
    path: 'edit-create-profile',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/edit-create-profile/edit-create-profile.module').then(m => m.EditCreateProfileModule)
  },
  {
    path: 'edit-create-profile/:id',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/edit-create-profile/edit-create-profile.module').then(m => m.EditCreateProfileModule)
  },
  {
    path: 'admin/actors',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/actors/actors.module').then(m => m.ActorsModule)
  },
  {
    path: 'admin/actor',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/actor/actor.module').then(m => m.ActorModule)
  },
  {
    path: 'admin/actor/:id',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/actor/actor.module').then(m => m.ActorModule)
  },
  {
    path: 'movie-serie/:id',
    canActivate: [ClientGuard],
    loadChildren: () => import('./pages/movie-serie/movie-serie.module').then(m => m.MovieSerieModule)
  },
  { 
    path: 'admin/directors', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/directors/directors.module').then(m => m.DirectorsModule) 
  },
  { 
    path: 'admin/director', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/director/director.module').then(m => m.DirectorModule) 
  },
  { 
    path: 'admin/director/:id', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/director/director.module').then(m => m.DirectorModule) 
  },
  { 
    path: 'admin/films',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/films/films.module').then(m => m.FilmsModule) 
  },
  { 
    path: 'admin/anuncios', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/anuncios/anuncios.module').then(m => m.AnunciosModule) 
  },
  { 
    path: 'admin/anuncio', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/anuncio/anuncio.module').then(m => m.AnuncioModule) 
  },
  { 
    path: 'admin/anuncio/:id', 
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/anuncio/anuncio.module').then(m => m.AnuncioModule) 
  },
  { 
    path: 'admin/reports',
    canActivate: [AdminGuard], 
    loadChildren: () => import('./pages/admin/reports/reports.module').then(m => m.ReportsModule) 
  },
  { 
    path: 'admin/simulation',
    canActivate: [AdminGuard], 
    loadChildren: () => import('./pages/admin/simulation/simulation.module').then(m => m.SimulationModule) 
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}