import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../environments/api.config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Task } from '../models/task';
import { HeadersService } from './headers.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    getTasksByListId(listId: number, page: number): Observable<any> {
        return this.http.get(`${API_CONFIG.taskListUrl}/${listId}?page=${page}`, this.headersService.getHeaders())
            .pipe(catchError(err => throwError(err)));
    }

    createTask(task: Task): Observable<any> {
        return this.http.post(
            API_CONFIG.taskRegisterUrl,
            task,
            this.headersService.getHeaders()
        )
            .pipe(catchError(err => throwError(err)));
    }

    updateTask(task: Task): Observable<any> {
        return this.http.put(
            `${API_CONFIG.taskUpdateUrl}/${task.id}`,
            task,
            this.headersService.getHeaders()
        )
            .pipe(catchError(err => throwError(err)));
    }

    deleteTask(taskId: number): Observable<any> {
        return this.http.delete(`${API_CONFIG.taskDeleteUrl}/${taskId}`, this.headersService.getHeaders())
            .pipe(catchError(err => throwError(err)));
    }
}
