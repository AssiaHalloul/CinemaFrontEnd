import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from '../../models/evenement.model';

const baseUrl = 'http://localhost:8080/api/evenements';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  host:string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${baseUrl}/`);
  }

  getEvenement(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createEvenement(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateEvenement(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteEvenement(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findEvenementByTitre(num: any): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${baseUrl}?num=${num}`);
  }
}