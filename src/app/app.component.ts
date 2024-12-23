import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthenticationService } from './authentication/authentication.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

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
    AuthService,
  ],
})
export class AppComponent implements OnInit {
  title = 'Casting Agency';
  items: MenuItem[] = [];
  token: string | null;

  constructor(
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

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

  initializeApp() {}

  onLogout() {
    this.authenticationService.logout();
    // this.authService
    //   .requestLogout()
    //   .pipe(
    //     catchError((error) => {
    //       console.log('Logout API failed:', error);
    //       return of(null);
    //     })
    //   )
    //   .subscribe(() => {
    //     this.authenticationService.login();
    //   });
    // of(this.token)
    //   .pipe(
    //     tap((token) => {
    //       if (!!token) {
    //         this.authService.check_token_is_revoked();
    //       }
    //     }),
    //     switchMap(() => {
    //       return this.authService.requestLogout();
    //     })
    //   )
    //   .subscribe(() => {
    //     this.authenticationService.logout();
    //     this.router.navigate(['/']);
    //   });
  }
}
