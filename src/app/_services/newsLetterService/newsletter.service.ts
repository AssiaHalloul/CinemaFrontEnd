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

  // this function allow us to get list of all newsletters
  getNewsletters(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${baseUrl}/`);
  }

  // this function allow us to get list of all newsletters by id
  getNewsletter(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  // this function allow us to create a newsletter
  createNewsletter(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  // this function allow us to update a newsletter
  updateNewsletter(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete a newsletter
  deleteNewsletter(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
