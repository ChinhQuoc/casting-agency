import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Subject, takeUntil } from 'rxjs';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-actor',
  standalone: true,
  templateUrl: './create-actor.component.html',
  styleUrls: ['../../movie/create-movie/create-movie.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    InputNumberModule,
    FieldsetModule,
    ConfirmDialogModule,
  ],
  providers: [MovieService, ActorService, MessageService, NotificationService],
})
export class CreateActorComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  genders = ['male', 'female'];
  movies: Movie[] = [];
  id: number;

  unsubscribe$ = new Subject();

  constructor(
    private movieService: MovieService,
    private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.movieService
        .getMovies()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (movies) => {
            this.movies = movies;
          },
          () => {
            this.notificationService.showMessage(
              'Cannot load movie list',
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

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(0, [
        Validators.required,
        Validators.max(200),
        Validators.min(0),
      ]),
      gender: new FormControl('male'),
      movies: new FormControl([]),
    });
  }

  loadDataForUpdating(id: number) {
    this.actorService
      .getActorById(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (actor) => {
          this.form = new FormGroup({
            name: new FormControl(actor.name, Validators.required),
            age: new FormControl(actor.age, [
              Validators.required,
              Validators.max(200),
              Validators.min(0),
            ]),
            gender: new FormControl(actor.gender),
            movies: new FormControl(actor.movies),
          });
        },
        () => {
          this.notificationService.showMessage(
            'Cannot load actor data',
            'Error'
          );
        }
      );
  }

  onSubmit() {
    if (!this.form || (this.form && !this.form.value)) return;

    const formData = this.form.value;
    const data = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      idsMovie: formData.movies.map((movie: Movie) => movie.id),
    };

    if (this.id) {
      this.actorService
        .updateActor(data, this.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/actors']);
          },
          () => {
            this.notificationService.showMessage('An error occour', 'Error');
          }
        );
    } else {
      this.actorService
        .createActor(data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate(['/actors']);
          },
          () => {
            this.notificationService.showMessage('An error occour', 'Error');
          }
        );
    }
  }

  invalidName(form: FormGroup): boolean {
    const nameControl = form.controls['name'];
    return !nameControl.valid && nameControl.touched;
  }

  invalidAge(form: FormGroup): boolean {
    const nameControl = form.controls['age'];
    return !nameControl.valid && nameControl.touched;
  }

  disableSubmitButton(): boolean {
    return !this.form.valid;
  }
}
