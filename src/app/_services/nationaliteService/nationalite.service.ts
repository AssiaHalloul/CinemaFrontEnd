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

  // this function allow us to get list of all nationalities
  getNationalites(): Observable<Nationalite[]> {
    return this.http.get<Nationalite[]>(`${baseUrl}/`);
  }

  // this function allow us to get list of all nationalities by id
  getNationalite(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create a nationalities
  createNationalite(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  // this function allow us to update a nationalities
  updateNationalite(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete a nationalities
  deleteNationalite(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // this function allow us to search for  a nationalities by libelle
  findNationaliteByLibelle(libelle: any): Observable<Nationalite[]> {
    return this.http.get<Nationalite[]>(`${baseUrl}?libelle=${libelle}`);
  }
}
