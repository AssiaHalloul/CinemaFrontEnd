import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personne } from '../../models/personne.model';


const baseUrl = 'http://localhost:8080/api/personnes';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
  host:string = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  // this function allow us to get a list of all persons
  getPersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${baseUrl}/`);
  }

  // this function allow us to get a list of all persons by id
  getPersonne(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  // this function allow us to get a list of all persons by type
  getPersonneByType(type: any): Observable<any> {
    return this.http.get(`${baseUrl}/${type}`);
  }
  // this function allow us to create a person
  createPersonne(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  // this function allow us to update a person
  updatePersonne(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete a person
  deletePersonne(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // this function allow us to get list of all filmmakers
  getRealisateurs(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${baseUrl}/rechercher`);
  }
  // this function allow us to get list of all actors
  getActeurs(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${baseUrl}/acteurs`);
  }

}
