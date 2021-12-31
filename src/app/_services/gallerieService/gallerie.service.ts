import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personne } from '../../models/personne.model';
import {Gallerie} from '../../models/gallerie.model';


const baseUrl = 'http://localhost:8080/api/galleries';

@Injectable({
  providedIn: 'root'
})
export class GallerieService {
  host:string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getGalleries(): Observable<Gallerie[]> {
    return this.http.get<Gallerie[]>(`${baseUrl}/`);
  }
  // this function allow us to get list of galleries
  getGallerie(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to get list of galleries by type
  getGallerieByType(type: any): Observable<any> {
    return this.http.get(`${baseUrl}/${type}`);
  }
  // this function allow us to create a gallery
  createGallerie(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  // this function allow us to update a gallery
  updateGallerie(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete a gallery
  deleteGallerie(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  getRealisateurs(): Observable<Gallerie[]> {
    return this.http.get<Gallerie[]>(`${baseUrl}/rechercher`);
  }


}
