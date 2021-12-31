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
  // this function allow us to get list of all film's types
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${baseUrl}/`);
  }

  // this function allow us to get list of all film's types by id
  getGenre(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create  a  film's type
  createGenre(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  // this function allow us to update  a  film's type
  updateGenre(id: number, data: Genre): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete  a  film's type
  deleteGenre(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // this function allow us to search for film's type by name
  findGenreByName(nom: any): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${baseUrl}?nom=${nom}`);
  }
}
