import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../../models/salle.model';
import { Seance } from '../../models/seance.model';

const baseUrl = 'http://localhost:8080/api/seances';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private http: HttpClient) { }

  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${baseUrl}/`);
  }

  getSeance(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createSeance(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateSeance(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteSeance(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findSeanceByDate(date: any): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${baseUrl}?date=${date}`);
  }
}