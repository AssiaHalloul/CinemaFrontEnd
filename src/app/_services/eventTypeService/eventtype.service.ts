import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Eventtype} from '../../models/eventtype.model'

const baseUrl = 'http://localhost:8080/api/typeEvents';

@Injectable({
  providedIn: 'root'
})
export class EventtypeService {
 constructor(private http: HttpClient) { }

  getEventTypes(): Observable<Eventtype[]> {
    return this.http.get<Eventtype[]>(`${baseUrl}/`);
  }

  getEventType(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createEventType(data: any): Observable<any> {
    return this.http.post(baseUrl+'/', data);
  }

  updateEventType(id: number, data: Eventtype): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteEventType(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }


}
