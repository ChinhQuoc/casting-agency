import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const hasPermission = false; // Replace with actual permission logic
    if (!hasPermission) {
      this.router.navigate(['/permission-denied']);
      return false;
    }
    return true;
  }

  private checkUserPermission(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.role === 'admin';
  }
}
