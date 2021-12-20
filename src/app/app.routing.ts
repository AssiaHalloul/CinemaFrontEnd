import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './_guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'film',
        loadChildren: () => import('./views/film/film.module').then(m => m.FilmModule)
      },
      {
        path: 'evenement',
        loadChildren: () => import('./views/evenement/evenement.module').then(m => m.EvenementModule)
      },
      {
        path: 'seance',
        loadChildren: () => import('./views/seance/seance.module').then(m => m.SeanceModule)
      },
      {
        path: 'personne',
        loadChildren: () => import('./views/personne/personne.module').then(m => m.PersonneModule)
      },
      {
        path: 'newsletter',
        loadChildren: () => import('./views/newsletter/newsletter.module').then(m => m.NewsletterModule)
      },
      {
        path: 'salle',
        loadChildren: () => import('./views/salle/salle.module').then(m => m.SalleModule)
      },
      {
        path: 'genre_film',
        loadChildren: () => import('./views/genre_film/genre_film.module').then(m => m.GenreFilmModule)
      },
      {
        path: 'type_event',
        loadChildren: () => import('./views/type_event/type_event.module').then(m => m.TypeEventModule)
      },
      {
        path: 'nationalite',
        loadChildren: () => import('./views/nationalite/nationalite.module').then(m => m.NationaliteModule)
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
