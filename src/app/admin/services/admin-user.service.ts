import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { map } from 'rxjs/internal/operators/map';
interface User {
  username?: String,
  email?: String,
  password?: String,
  token?: String,
  role?:String
}
@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
 
  constructor(private httpClient: HttpClient, private _baseService: BaseService) { }

  fetchAllUsers(){
    return this.httpClient.get<User[]>(`users`)
      .pipe(
        catchError(this._baseService.handleError('unable to fetch all users'))
      );
  }


  deleteUser(user_id){
    return this.httpClient.delete<User[]>(`users/delete/${user_id}`,{})
      .pipe(
        catchError(this._baseService.handleError('unable to delete user'))
      );
  }
  addUser(user){
    console.log("user",user)
    return this.httpClient.post<User[]>(`users/add`,user)
      .pipe(
        catchError(this._baseService.handleError('unable to add user'))
      );
  }
  updateUser(user_id, user){
    return this.httpClient.put<User[]>(`users/edit`,user)
      .pipe(
        catchError(this._baseService.handleError('unable to update user'))
      );
  }
  change(user_id,user){
    return this.httpClient.post('users/update-status',{_id:user_id,isActive:!user.isActive})
    .pipe(
      catchError(this._baseService.handleError('unable to change status'))
    );
  }
}
