import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actor } from '../../models/actor';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActorService } from '../../services/actor.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../../services/movie.service';
import { Subject, takeUntil } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    CommonModule,
    FieldsetModule,
  ],
  providers: [ActorService, MovieService, NotificationService],
})
export class CreateMovieComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  selectedActors: Actor[] = [];
  actors: Actor[] = [];
  id: number;
  minDate: Date;

  unsubscribe$ = new Subject();

  constructor(
    private actorService: ActorService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.minDate = new Date();
      this.id = params['id'];
      this.actorService
        .getActors()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (actors) => {
            this.actors = actors;
          },
          () => {
            this.notificationService.showMessage(
              'Error load actor list',
              'Error'
            );
          }
        );
      this.initForm();
      if (this.id) {
        this.loadDataForUpdating(this.id);
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      releaseDate: new FormControl(this.minDate, Validators.required),
      actors: new FormControl([]),
    });
  }

  loadDataForUpdating(id: number) {
    this.movieService.getMovieById(id).subscribe(
      (movie) => {
        this.form = new FormGroup({
          title: new FormControl(movie.title, Validators.required),
          releaseDate: new FormControl(
            new Date(movie.releaseDate),
            Validators.required
          ),
          actors: new FormControl(movie.actors),
        });
      },
      () => {
        this.notificationService.showMessage('Error load movie data', 'Error');
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit() {
    if (!this.form || (this.form && !this.form.value)) return;

    const formData = this.form.value;
    const data = {
      title: formData.title,
      releaseDate: formData.releaseDate,
      idsActor: formData.actors.map((actor: Actor) => actor.id),
    };

    if (this.id) {
      this.movieService
        .updateMovie(data, this.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/movies']);
          },
          () => {
            this.notificationService.showMessage(
              'Error create a movie',
              'Error'
            );
          }
        );
    } else {
      this.movieService
        .createMovie(data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/movies']);
          },
          () => {
            this.notificationService.showMessage(
              'Error update a movie',
              'Error'
            );
          }
        );
    }
  }

  invalidTitle(form: FormGroup): boolean {
    const nameControl = form.controls['title'];
    return !nameControl.valid && nameControl.touched;
  }

  invalidDate(form: FormGroup): boolean {
    const nameControl = form.controls['releaseDate'];
    return !nameControl.valid && nameControl.touched;
  }

  disableSubmitButton(): boolean {
    return !this.form.valid;
  }
}
