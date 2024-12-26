import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthenticationService } from './authentication/authentication.service';
import { PermissionGuard } from './authentication/permisson-guard.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuModule, HttpClientModule, CommonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    MessageService,
    ConfirmationService,
    AuthGuardService,
    AuthenticationService,
    PermissionGuard,
    AuthService,
  ],
})
export class AppComponent implements OnInit {
  title = 'Casting Agency';
  items: MenuItem[] = [];
  token: string | null;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if (window.location.hash.includes('access_token')) {
      this.authenticationService.handleAuthCallback();
    }

    const token = this.authenticationService.getToken();
    if (!this.authenticationService.isAuthenticated(token)) {
      this.authenticationService.login();
    }

    this.items = [
      { label: 'Movies', route: 'movies', icon: 'pi pi-video' },
      { label: 'Artors', route: 'actors', icon: 'pi pi-user' },
      { label: 'Logout', route: null, icon: 'pi pi-sign-out' },
    ];
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
