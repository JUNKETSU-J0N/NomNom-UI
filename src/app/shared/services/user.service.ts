import { Injectable } from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../core/models/user.model';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private route = 'users';

  constructor(private httpService: HttpService) { }

  getAllUser(): Observable<UserModel[]> {
    return this.httpService.get<UserModel[]>(this.route);
  }

  getUserById(id: string): Observable<UserModel> {
    return this.httpService.get<UserModel>(`${this.route}/${id}`);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.httpService.post(this.route, user);
  }

  updateUser(id: string, user: UserModel): Observable<UserModel> {
    return this.httpService.put(`${this.route}/${id}`, user);
  }

  checkIfUserExists(userId: string): Observable<UserModel> {
    const params = new HttpParams().set('id', userId.toString());
    return this.httpService.get(`${this.route}/init`, { params });
  }
}
