import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public messageService: MessageService) {}

  showMessage(detail: string, type = 'Success') {
    this.messageService.add({
      severity: type.toLowerCase(),
      summary: type,
      detail: detail,
    });
  }
}
