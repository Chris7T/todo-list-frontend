import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { API_CONFIG } from '../../environments/api.config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(user: User): Observable<any> {
        return this.http.post(API_CONFIG.userLoginUrl, user)
            .pipe(catchError(err => throwError(err)));
    }

    register(user: User): Observable<any> {
        return this.http.post(API_CONFIG.userRegisterUrl, user)
            .pipe(catchError(err => throwError(err)));
    }
}
