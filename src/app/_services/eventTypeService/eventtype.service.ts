import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Eventtype} from '../../models/eventtype.model';

const baseUrl = 'http://localhost:8080/api/typeEvents';

@Injectable({
  providedIn: 'root'
})
export class EventtypeService {
 constructor(private http: HttpClient) { }

  // this function return list of all types
  getEventTypes(): Observable<Eventtype[]> {
    return this.http.get<Eventtype[]>(`${baseUrl}/`);
  }
  // this function return list of evenement type by id
  getEventType(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  // this function allow us to create an evenement type
  createEventType(data: any): Observable<any> {
    return this.http.post(baseUrl + '/', data);
  }

  // this function allow us to update an evenement type
  updateEventType(id: number, data: Eventtype): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // this function allow us to delete an evenement type
  deleteEventType(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }


}
