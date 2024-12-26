import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../services/notification.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { User } from '../../models/user';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  imports: [
    TableModule,
    HttpClientModule,
    CommonModule,
    PanelModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FieldsetModule,
  ],
  providers: [
    MovieService,
    MessageService,
    NotificationService,
    AuthenticationService,
  ],
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  actionsMenu: MenuItem[] = [];
  unsubscribe$ = new Subject();

  constructor(
    private movieService: MovieService,
    private router: Router,
    private readonly notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getMovieList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  getMovieList() {
    this.movieService
      .getMovies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        },
        (_) => {
          this.notificationService.showMessage(
            'Error load movie list',
            'Error'
          );
        }
      );
  }

  editEvent(id: number) {
    this.router.navigate(['/movies/edit', id]);
  }

  deleteEvent(movie: Movie, event: Event) {
    this.showPopupConfirm(movie, event);
  }

  detailEvent(id: number) {
    this.router.navigate(['/movies', id]);
  }

  goToCreate() {
    this.router.navigate(['/movies/create']);
  }

  showPopupConfirm(movie: Movie, event: Event) {
    if (!movie.id) return;

    const id = movie.id;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want to delete movie ${movie.title}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.movieService
          .deleteMovie(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            () => {
              this.notificationService.showMessage('Deleted successfully');
              this.getMovieList();
            },
            () => {
              this.notificationService.showMessage(
                'Error delete movie',
                'Error'
              );
            }
          );
      },
    });
  }

  showButtonCreate(): boolean {
    return this.authenticationService.can('post:movie');
  }

  showButtonEdit(): boolean {
    return this.authenticationService.can('patch:movie');
  }

  showButtonDetail(): boolean {
    return this.authenticationService.can('get:movie');
  }

  showButtonDelete(): boolean {
    return this.authenticationService.can('delete:movie');
  }
}
