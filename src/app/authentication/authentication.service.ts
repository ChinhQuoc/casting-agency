import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authUrl = `https://${environment.auth0.domain}/authorize`;
  private audience = environment.auth0.audience;
  private clientId = environment.auth0.clientId;
  private callbackUrl = environment.auth0.callbackURL;

  token: string | null = null;
  payload: any;

  jwtHelper = new JwtHelperService();

  login() {
    history.replaceState({}, document.title, window.location.pathname);
    const token = this.getToken();
    if (this.isAuthenticated(token)) {
      return;
    }

    const url = `${this.authUrl}?response_type=token&client_id=${this.clientId}&audience=${this.audience}&redirect_uri=${this.callbackUrl}`;
    window.location.href = url;
  }

  isAuthenticated(token: string | null): boolean {
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  saveToken() {
    if (this.token) {
      localStorage.setItem(JWTS_LOCAL_KEY, this.token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(JWTS_LOCAL_KEY);
  }

  handleAuthCallback() {
    const fragment = window.location.hash.substr(1).split('&');
    const tokenParam = fragment.find((param) =>
      param.startsWith('access_token=')
    );

    if (tokenParam) {
      this.token = tokenParam.split('=')[1];
      this.saveToken();

      history.replaceState({}, document.title, window.location.pathname);
    }
  }

  loadToken() {
    this.token = localStorage.getItem(JWTS_LOCAL_KEY);
  }

  logout() {
    this.token = null;
    localStorage.removeItem(JWTS_LOCAL_KEY);
    window.location.href = `https://${environment.auth0.domain}/v2/logout?client_id=${this.clientId}&returnTo=${this.callbackUrl}`;
  }

  getLoggedInUser(token: string | null) {
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  getUserInfo(token: string | null): User {
    const user: User = this.getLoggedInUser(token);
    return user;
  }

  can(permission: string): boolean {
    this.payload = this.getLoggedInUser(this.getToken());
    return (
      this.payload &&
      this.payload.permissions &&
      this.payload.permissions.indexOf(permission) >= 0
    );
  }
}
