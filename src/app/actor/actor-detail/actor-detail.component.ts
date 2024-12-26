import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Actor } from '../../models/actor';
import { FieldsetModule } from 'primeng/fieldset';
import { NotificationService } from '../../services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-actor',
  standalone: true,
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss'],
  imports: [CommonModule, FieldsetModule],
  providers: [ActorService, NotificationService],
})
export class ActorDetailComponent implements OnInit, OnDestroy {
  actor: Actor;
  unsubscribe$ = new Subject();

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.actorService
        .getActorById(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (actor) => (this.actor = actor),
          () => {
            this.notificationService.showMessage(
              'Error load actor data',
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
