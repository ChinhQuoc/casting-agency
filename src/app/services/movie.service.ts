import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiSercerUrl = environment.apiServerUrl;
  private baseUrl = `${this.apiSercerUrl}/movies`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.baseUrl)
      .pipe(pluck('movies')) as Observable<Movie[]>;
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http
      .get<Movie>(`${this.baseUrl}/${id}`)
      .pipe(pluck('movie')) as Observable<Movie>;
  }

  createMovie(data: Movie): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateMovie(data: Movie, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
