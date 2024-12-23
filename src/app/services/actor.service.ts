import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { Observable, pluck } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  apiSercerUrl = environment.apiServerUrl;
  private baseUrl = `${this.apiSercerUrl}/actors`;

  constructor(private http: HttpClient) {}

  getActors(): Observable<Actor[]> {
    return this.http
      .get<Actor[]>(this.baseUrl)
      .pipe(pluck('actors')) as Observable<Actor[]>;
  }

  getActorById(id: number) {
    return this.http
      .get<Actor>(`${this.baseUrl}/${id}`)
      .pipe(pluck('actor')) as Observable<Actor>;
  }

  createActor(data: Actor): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateActor(data: Actor, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteActor(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
