import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Newsletter } from '../../models/newsletter.model';
// import { Nationalite } from '../../models/nationalite.model';

const baseUrl = 'http://localhost:8080/api/newsLetters';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  getNewsletters(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${baseUrl}/`);
  }

  getNewsletter(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createNewsletter(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  updateNewsletter(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteNewsletter(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // findNationaliteByLibelle(libelle: any): Observable<Nationalite[]> {
  //   return this.http.get<Nationalite[]>(`${baseUrl}?libelle=${libelle}`);
  // }
}
