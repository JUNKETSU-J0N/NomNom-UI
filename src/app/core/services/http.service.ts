import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

get<T>(route: string, options?: { params?: HttpParams }): Observable<T> {
  return this.http.get<T>(`${this.baseUrl}/${route}`, {
    headers: this.getAuthHeaders(),
    ...(options || {})
  });
}

  post<T>(route: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${route}`, {
    headers: this.getAuthHeaders(), body});
  }

  put<T>(route: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${route}`,  {
    headers: this.getAuthHeaders(), body});
  }

  delete<T>(route: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${route}`, {
    headers: this.getAuthHeaders()});
  }
}
