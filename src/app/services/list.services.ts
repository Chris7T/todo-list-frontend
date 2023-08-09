import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../environments/api.config';
import { List } from '../models/list';
import { HeadersService } from './headers.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(
    private http: HttpClient,
    private headersService: HeadersService
  ) { }

  registerList(list: List): Observable<any> {
    return this.http.post(
      `${API_CONFIG.taskListRegisterUrl}`,
      list,
      this.headersService.getHeaders()
    ).pipe(catchError(err => throwError(err)));
  }

  listList(page: number = 1): Observable<any> {
    return this.http.get(`${API_CONFIG.taskListListUrl}?page=${page}`, this.headersService.getHeaders())
      .pipe(catchError(err => throwError(err)));
  }

  updateList(id: number, list: List): Observable<any> {
    return this.http.put(`${API_CONFIG.taskListUpdateUrl}/${id}`, list, this.headersService.getHeaders())
      .pipe(catchError(err => throwError(err)));
  }

  deleteList(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.taskListDeleteUrl}/${id}`, this.headersService.getHeaders())
      .pipe(catchError(err => throwError(err)));
  }

  importFromGoogleAPI(): Observable<any> {
    return this.http.get(
      `${API_CONFIG.taskGoogleImportUrl}`,
      this.headersService.getHeaders()
    ).pipe(catchError(err => throwError(err)));
  }

  exportFromGoogleAPI(): Observable<any> {
    return this.http.get(
      `${API_CONFIG.taskGoogleExportUrl}`,
      this.headersService.getHeaders()
    ).pipe(catchError(err => throwError(err)));
  }

  googleConect(): Observable<any> {
    return this.http.get(
      `${API_CONFIG.googleAuthUrl}`,
      this.headersService.getHeaders()
    ).pipe(catchError(err => throwError(err)));
  }
}
