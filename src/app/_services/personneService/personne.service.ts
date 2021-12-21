import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personne } from '../../models/personne.model';


const baseUrl = 'http://localhost:8080/api/personnes';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor(private http: HttpClient) { }

  getPersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${baseUrl}/`);
  }

  getPersonne(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  getPersonneByType(type: any): Observable<any> {
    return this.http.get(`${baseUrl}/${type}`);
  }
  createPersonne(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  updatePersonne(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deletePersonne(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getRealisateurs(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${baseUrl}/rechercher`);
  }
  
}
