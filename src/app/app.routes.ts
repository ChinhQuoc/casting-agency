import { Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';
import { PermissionGuard } from './authentication/permisson-guard.service';

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
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'get:movies',
        },
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./movie/create-movie/create-movie.component').then(
            (m) => m.CreateMovieComponent
          ),
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'post:movie',
        },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./movie/movie-detail/movie-detail.component').then(
            (m) => m.MovieDetailComponent
          ),
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'get:movie',
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./movie/create-movie/create-movie.component').then(
            (m) => m.CreateMovieComponent
          ),
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'patch:movie',
        },
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
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'get:actors',
        },
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./actor/create-actor/create-actor.component').then(
            (m) => m.CreateActorComponent
          ),
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'post:actor',
        },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./actor/actor-detail/actor-detail.component').then(
            (m) => m.ActorDetailComponent
          ),
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'get:actor',
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./actor/create-actor/create-actor.component').then(
            (m) => m.CreateActorComponent
          ),
        canActivate: [AuthGuardService, PermissionGuard],
        data: {
          role: 'patch:actor',
        },
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
