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
  host:string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getGalleries(): Observable<Gallerie[]> {
    return this.http.get<Gallerie[]>(`${baseUrl}/`);
  }

  getGallerie(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  getGallerieByType(type: any): Observable<any> {
    return this.http.get(`${baseUrl}/${type}`);
  }
  createGallerie(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  updateGallerie(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteGallerie(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  getRealisateurs(): Observable<Gallerie[]> {
    return this.http.get<Gallerie[]>(`${baseUrl}/rechercher`);
  }


}
