import { Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./movie/movie-list/movie-list.component').then(
            (m) => m.MovieListComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./movie/create-movie/create-movie.component').then(
            (m) => m.CreateMovieComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./movie/movie-detail/movie-detail.component').then(
            (m) => m.MovieDetailComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./movie/create-movie/create-movie.component').then(
            (m) => m.CreateMovieComponent
          ),
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'actors',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./actor/actor-list/actor-list.component').then(
            (m) => m.ActorListComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./actor/create-actor/create-actor.component').then(
            (m) => m.CreateActorComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./actor/actor-detail/actor-detail.component').then(
            (m) => m.ActorDetailComponent
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./actor/create-actor/create-actor.component').then(
            (m) => m.CreateActorComponent
          ),
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: 'permission-denied',
    loadComponent: () =>
      import('./error-permission/error-permission.component').then(
        (m) => m.ErrorPermissionComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/movies',
  },
];
