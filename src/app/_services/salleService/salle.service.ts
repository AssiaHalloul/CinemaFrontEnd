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

  // this function allow us to get list of all romes
  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${baseUrl}/`);
  }

  // this function allow us to get list of all romes by id
  getSalle(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create a rome
  createSalle(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  // this function allow us to update a rome
  updateSalle(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to update a rome
  deleteSalle(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // this function allow us to search for a rome by it's number
  findSalleByNm(num: any): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${baseUrl}?num=${num}`);
  }
}
