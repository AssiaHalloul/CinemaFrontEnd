import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from '../../models/evenement.model';

const baseUrl = 'http://localhost:8080/api/evenements';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  host: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // this function return list of all evenements
  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${baseUrl}/`);
  }

  // this function return list of evenement by id
  getEvenement(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create an evenement
  createEvenement(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  // this function allow us to update an evenement
  updateEvenement(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete an evenement
  deleteEvenement(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // this function allow us to search for an evenement by title
  findEvenementByTitre(num: any): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${baseUrl}?num=${num}`);
  }
}
