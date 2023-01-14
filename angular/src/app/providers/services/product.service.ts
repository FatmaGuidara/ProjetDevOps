import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3000/product/"

  constructor(private _http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this._http.get(`${this.baseUrl}`)
  }
  getSingleProduct(id: string):Observable<any>{
    return this._http.get(`${this.baseUrl}single/${id}`)
  }
  addProduct(data: Product):Observable<any>{
    return this._http.post(`${this.baseUrl}add`, data)
  }
  delProduct(id: string):Observable<any>{
    return this._http.delete(`${this.baseUrl}single/${id}`)
  }
  editProduct(id: string, data: Product):Observable<any>{
    return this._http.patch(`${this.baseUrl}single/${id}`, data)
  }
  myProducts():Observable<any>{
    return this._http.get(`${this.baseUrl}myProducts`)
  }
  imgUpload(id: string, data: any):Observable<any>{
    return this._http.post(`${this.baseUrl}productImg/${id}`, data)
  }
}
