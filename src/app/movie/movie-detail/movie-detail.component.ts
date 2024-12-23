import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-detail-movie',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  imports: [CommonModule, FieldsetModule],
  providers: [MovieService, NotificationService],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: Movie;
  unsubscribe$ = new Subject();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.movieService
        .getMovieById(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (movie) => (this.movie = movie),
          () => {
            this.notificationService.showMessage(
              'Error load movie data',
              'Error'
            );
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
