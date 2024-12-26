import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: any): boolean {
    if (!route.data) return true;

    const role = route.data.role;
    const hasPermission = this.authenticationService.can(role);

    if (!hasPermission) {
      this.router.navigate(['/permission-denied']);
      return false;
    }

    return true;
  }
}
