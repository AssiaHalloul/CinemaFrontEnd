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

  // this function allow us to get list of all sessions
  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${baseUrl}/`);
  }

  // this function allow us to get list of all sessions by id
  getSeance(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create a session
  createSeance(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }
  // this function allow us to update a session
  updateSeance(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  // this function allow us to delete a session
  deleteSeance(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  // this function allow us to search for  a session by date
  findSeanceByDate(date: any): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${baseUrl}?date=${date}`);
  }
}
