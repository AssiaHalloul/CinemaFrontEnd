import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nationalite } from '../../models/nationalite.model';

const baseUrl = 'http://localhost:8080/api/nationalites';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {

  constructor(private http: HttpClient) { }

  getNationalites(): Observable<Nationalite[]> {
    return this.http.get<Nationalite[]>(`${baseUrl}/`);
  }

  getNationalite(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createNationalite(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateNationalite(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteNationalite(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findNationaliteByLibelle(libelle: any): Observable<Nationalite[]> {
    return this.http.get<Nationalite[]>(`${baseUrl}?libelle=${libelle}`);
  }
}