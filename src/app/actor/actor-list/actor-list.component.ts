import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../models/actor';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FieldsetModule } from 'primeng/fieldset';
import { NotificationService } from '../../services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    PanelModule,
    ButtonModule,
    FieldsetModule,
    ConfirmDialogModule,
  ],
  providers: [
    ActorService,
    NotificationService,
    ConfirmationService,
    AuthenticationService,
  ],
  styleUrls: ['./actor-list.component.scss'],
})
export class ActorListComponent implements OnInit, OnDestroy {
  actors: Actor[] = [];
  unsubscribe$ = new Subject();

  constructor(
    private actorService: ActorService,
    private router: Router,
    private readonly notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getActorList();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  getActorList() {
    this.actorService
      .getActors()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.actors = res;
        },
        () => {
          this.notificationService.showMessage(
            'Error load actor list',
            'Error'
          );
        }
      );
  }

  editEvent(id: number) {
    this.router.navigate(['/actors/edit', id]);
  }

  deleteEvent(actor: Actor, event: Event) {
    this.showPopupConfirm(actor, event);
  }

  detailEvent(id: number) {
    this.router.navigate(['/actors', id]);
  }

  goToCreate() {
    this.router.navigate(['/actors/create']);
  }

  showPopupConfirm(actor: Actor, event: Event) {
    if (!actor.id) return;

    const id = actor.id;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want to delete actor ${actor.name}}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.actorService
          .deleteActor(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            () => {
              this.notificationService.showMessage('Deleted successfully');
              this.getActorList();
            },
            () => {
              this.notificationService.showMessage(
                'Error delete actor',
                'Error'
              );
            }
          );
      },
    });
  }

  showButtonCreate(): boolean {
    return this.authenticationService.can('post:actor');
  }

  showButtonEdit(): boolean {
    return this.authenticationService.can('patch:actor');
  }

  showButtonDetail(): boolean {
    return this.authenticationService.can('get:actor');
  }

  showButtonDelete(): boolean {
    return this.authenticationService.can('delete:actor');
  }
}
