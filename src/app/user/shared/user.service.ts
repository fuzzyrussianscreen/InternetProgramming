import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Response } from "@angular/http";
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    readonly rootUrl = 'https://localhost:44328';
      constructor(private http: HttpClient) { }

      registerUser(user : User){
        const body: User = {
          UserName: user.UserName,
          Password: user.Password
        }


        return this.http.post(this.rootUrl + '/api/User/Register', body);
      }


            userAuthentication(userName, password) {
            var data = "username=" + userName + "&password=" + password + "&grant_type=password";
            var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
            return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
              }

    getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }
}
