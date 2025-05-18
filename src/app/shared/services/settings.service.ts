import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreferenceType } from '../../core/enums/PreferenceType';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private base = 'http://localhost:8080/api/users';   //Full URL for the right Port

  constructor(private http: HttpClient) {}

  getUserPreference(userId: string): Observable<PreferenceType> {
    return this.http.get<{ preference: PreferenceType }>(`${this.base}/${userId}`)
      .pipe(map((resp) => resp.preference));
  }

  setUserPreference(userId: string, preference: PreferenceType): Observable<PreferenceType> {
    return this.http
      .put<{ preference: PreferenceType }>(
        `${this.base}/${userId}/preference`,
        { preference }
      )
      .pipe(map((resp) => resp.preference));
  }
}
