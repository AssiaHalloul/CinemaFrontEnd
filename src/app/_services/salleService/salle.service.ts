import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../../models/salle.model';

const baseUrl = 'http://localhost:8080/api/salles';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http: HttpClient) { }

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${baseUrl}/`);
  }

  getSalle(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createSalle(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateSalle(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteSalle(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findSalleByNm(num: any): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${baseUrl}?num=${num}`);
  }
}