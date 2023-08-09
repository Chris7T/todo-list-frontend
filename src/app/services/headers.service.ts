import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  
  constructor() { }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public getHeaders(): any {
    const token = this.getToken();
    if (token) {
      return {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
    }
    return {};
  }
}
