import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../environments/api.config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(
    private http: HttpClient,
    private headersService: HeadersService
    ) { }

  googleAuth(): Observable<any> {
    return this.http.get(API_CONFIG.googleAuthUrl);
  }

  googleAuthCallback(url: string): Observable<any> {
    return this.http.get(
      `${API_CONFIG.googleAuthCallbackUrl}${url}`,
      this.headersService.getHeaders()
    ).pipe(catchError(err => throwError(err)));
  }
}
