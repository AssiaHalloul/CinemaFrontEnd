import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../../models/film.model';
const baseUrll = 'http://localhost:8080/api/films/poster';

const baseUrl = 'http://localhost:8080/api/films';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  host: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  // this function return list of all films
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${baseUrl}/`);
  }

  // this function return list of films by id
  getFilm(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create a film
  createFilm(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  // this function allow us to update a film
  updateFilm(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete a film
  deleteFilm(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // this function allow us to search a film by titlr
  findFilmByTitre(titre: any): Observable<Film[]> {
    return this.http.get<Film[]>(`${baseUrl}?titre=${titre}`);
  }

  createData(formData: FormData): Observable<any> {
    return this.http.post(`${baseUrll}`, formData);
  }

  getImage(id: any): Observable<any> {
    return this.http.get('http://localhost:8080/imagePoster/' + id);
  }

}
