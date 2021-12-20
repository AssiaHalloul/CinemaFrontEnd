import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Genre} from '../../models/genre.model'

const baseUrl = 'http://localhost:8080/api/genres';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
 constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${baseUrl}/`);
  }

  getGenre(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createGenre(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateGenre(id: number, data: Genre): Observable<any> {
    console.log("change here")
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteGenre(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findGenreByName(nom: any): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${baseUrl}?nom=${nom}`);
  }
}
