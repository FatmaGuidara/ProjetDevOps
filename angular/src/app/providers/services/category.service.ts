import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = "http://localhost:3000/category/"

  constructor(private _http:HttpClient) { }

  getAllCategories():Observable<any>{
    return this._http.get(`${this.baseUrl}`)
  }
  addCategory(data: any):Observable<any>{
    return this._http.post(`${this.baseUrl}add`, data)
  }
  singleCategory(id: string):Observable<any>{
    return this._http.get(`${this.baseUrl}single/${id}`)
  }
  delCategory(id: string):Observable<any>{
    return this._http.delete(`${this.baseUrl}single/${id}`)
  }
  editCategory(id: string, data: Category):Observable<any>{
    return this._http.patch(`${this.baseUrl}single/${id}`, data)
  }  
  products(id: string):Observable<any>{
    return this._http.get(`${this.baseUrl}products/${id}`)
  }  
  imgUpload(id: string, data: any):Observable<any>{
    return this._http.post(`${this.baseUrl}categoryImg/${id}`, data)
  }  

}
