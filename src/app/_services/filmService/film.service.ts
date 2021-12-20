import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../../models/film.model';

const baseUrl = 'http://localhost:8080/api/films';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${baseUrl}/`);
  }

  getFilm(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createFilm(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateFilm(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteFilm(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findFilmByTitre(titre: any): Observable<Film[]> {
    return this.http.get<Film[]>(`${baseUrl}?titre=${titre}`);
  }



}
