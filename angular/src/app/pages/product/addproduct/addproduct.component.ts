import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/providers/services/category.service';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errMsg: any = {}
  categories: any[] = []
  // baseUrl = "http://localhost:3000/"

  productForm:FormGroup = new FormGroup({
      title: new FormControl("", [Validators.required]),
      desc: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      categoryId: new FormControl("", [Validators.required])
  });

  constructor(private _data:ProductService, private _router:Router, private _category:CategoryService) { }

  // Access formcontrols getter
  get title() {
    return this.productForm.get("title");
  }
  get desc() {
    return this.productForm.get("desc");
  }
  get price() {
    return this.productForm.get("price");
  }
  get categoryId() {
    return this.productForm.get("categoryId");
  }

  ngOnInit(): void { 
    this.getCategories()
  }

  handleProduct() {
    let productData: Product = this.productForm.value
    console.log(productData)
    this._data.addProduct(productData).subscribe(
      res=>{
        console.log(res)
      },
      e =>{
        if(e.error.message.includes("title")) this.errMsg.title = e.error.data.errors.title.message
        if(e.error.message.includes("desc")) this.errMsg.desc = e.error.data.errors.desc.message
        if(e.error.message.includes("price")) this.errMsg.price = e.error.data.errors.price.message
        if(e.error.message.includes("categoryId")) this.errMsg.categoryId = e.error.data.errors.categoryId.message
        console.log(e.error)
      },
      () => {
        this._router.navigateByUrl("product/myproducts")
      }
    )
  }

  getCategories(){
    this._category.getAllCategories().subscribe(
      res => {
        // console.log(res.data)
        this.categories = res.data
      },
      e => {
        console.log(e)
      }
    )
  }
}
