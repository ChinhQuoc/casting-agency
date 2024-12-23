import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiSercerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  requestLogout(): Observable<any> {
    return this.http.post(`${this.apiSercerUrl}/logout`, { logout: true });
  }

  check_token_is_revoked(): Observable<any> {
    return this.http.post(`${this.apiSercerUrl}/revoke`, {
      revoke_token: true,
    });
  }
}
