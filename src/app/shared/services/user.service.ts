import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import {BACK_END_URL} from '../../../environments'
import { catchError } from 'rxjs/internal/operators/catchError';
import { BaseService } from './base.service';
import { map } from 'rxjs/internal/operators/map';
interface User {
  username?: String,
  email?: String,
  password?: String,
  token?: String
}
@Injectable({
  providedIn: 'root'
})


export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private httpClient: HttpClient, private _baseService: BaseService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    console.log("curren user",JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>("signup", user)
      .pipe(
        catchError(this._baseService.handleError('Unable to processs! user/email already exists', user))
      );
  }
  login(user) {
    return this.httpClient.post<User>("login", user)
      .pipe(map((user: User) => {
        // login successful if there's a jwt token in the response
        if (user && user['data'] && user['data'].token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user["data"]["user"]));
          localStorage.setItem('token', JSON.stringify(user["data"].token));
          this.currentUserSubject.next(user["data"]["user"]);
        }

        return user;
      }
      ),
        catchError(this._baseService.handleError('Unable to Login Incorrect Email or Password Incorrect', user))
      );
  }
  verifyUser(token) {
    return this.httpClient.get<User>(`login/${token}`)
      .pipe(map((user: User) => {
        console.log("success verification of the mail!", user)
        return user;
      }
      ),
        catchError(this._baseService.handleError('Email verification failed!'))
      );
  }
  forgetPassword(email): Observable<User> {
    return this.httpClient.post("forgot-password", email)
      .pipe(
        catchError(this._baseService.handleError('Unable to process e-Mail', email))
      );
  }
  updatePassword(data): Observable<User> {
    return this.httpClient.put("update-password", data)
      .pipe(
        catchError(this._baseService.handleError('Unable To Update Password', data))
      );
  }
  resetPassword(data): Observable<User> {
    return this.httpClient.put("reset-password", data)
      .pipe(
        catchError(this._baseService.handleError('Unable To Reset Password', data))
      );
  }




  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

}