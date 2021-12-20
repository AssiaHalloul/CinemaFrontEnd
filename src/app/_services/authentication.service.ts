import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const optionRequete = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            })
        };
        return this.http.post<any>('http://127.0.0.1:8080/authenticate', { username: username, password: password }, optionRequete)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    // editProfile(id, data) {
    //     let headers: HttpHeaders = new HttpHeaders();
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     headers.append('Content-Type', 'application/json; charset=UTF-8');
    //     headers.append('Authorization', `Bearer ${currentUser.token}`);

    //     return this.http.put<any>('http://127.0.0.1:8000/api/editprofile/' + id, data, { headers });
    // }

//     getMe() {
//       let headers: HttpHeaders = new HttpHeaders();
//       let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//       headers.append('Content-Type', 'application/json; charset=UTF-8');
//       headers.append('Authorization', `Bearer ${currentUser.token}`);

//       return this.http.post<any>('http://127.0.0.1:8000/api/me',{ headers });
//   }

}
