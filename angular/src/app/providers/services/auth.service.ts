import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:3000/user/"
  public userData = null
  public isLoggedin = false

  constructor(private _http:HttpClient) { }

  register(data: User){
    return this._http.post(`${this.baseUrl}register`, data)
  }
  login(data: any):Observable<any>{
    return this._http.post(`${this.baseUrl}login`, data)
  }
  getAllUsers():Observable<any>{
    return this._http.get(`${this.baseUrl}`)
  }
  logout():Observable<any>{
    return this._http.post(`${this.baseUrl}logout`, null)
  }
  logoutAll():Observable<any>{
    return this._http.post(`${this.baseUrl}logoutAll`, null)
  }
  singleUser(id: string):Observable<any>{
    return this._http.get(`${this.baseUrl}single/${id}`)
  }
  delUser(id: string):Observable<any>{
    return this._http.delete(`${this.baseUrl}single/${id}`)
  }
  editUser(id: string, data: User):Observable<any>{
    return this._http.patch(`${this.baseUrl}single/${id}`, data)
  }
  profile():Observable<any>{
    return this._http.post(`${this.baseUrl}profile`, null)
  }
  imgUpload(data: any):Observable<any>{
    return this._http.post(`${this.baseUrl}imgUpload`, data)
  }

}
