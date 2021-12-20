import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getuser() {
        const optionRequete = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
            })
        };

        return this.http.post<User[]>('/api/me', null, optionRequete);
    }



}