import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(route: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${route}`, { params });
  }

  post<T>(route: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${route}`, body);
  }

  put<T>(route: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${route}`, body);
  }

  delete<T>(route: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${route}`);
  }
}
