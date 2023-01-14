import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';
import { CategoryService } from 'src/app/providers/services/category.service';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  errMsg: any = {};
  product: any = {}
  selectedCategory: any = {}
  categories: any[] = []
  id: any
  file:any
  myData:FormData = new FormData()

  editForm:FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    desc: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    categoryId: new FormControl("", [Validators.required])
  });

  constructor(private _data:ProductService, private _router:Router, private _activatedRoute:ActivatedRoute, private _auth:AuthService, private _category:CategoryService) { }

  get title() {
  return this.editForm.get("title");
  }
  get desc() {
  return this.editForm.get("desc");
  }
  get price() {
  return this.editForm.get("price");
  }
  get categoryId() {
    return this.editForm.get("categoryId");
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"] //req.params.id
    this.getSingle()
    this.getCategories()
  }

  handleEdit(){
      if(this.product){
        this._data.editProduct(this.product?.["_id"], this.editForm.value)
        .subscribe(
          (res) => {
              if(this.file) this.submitImage()
              // console.log(res);
          },
          (e) => {
              if (e.error.message.includes("title")) this.errMsg.title = e.error.data.errors.title.message;
              if (e.error.message.includes("desc")) this.errMsg.desc = e.error.data.errors.desc.message;
              if (e.error.message.includes("price")) this.errMsg.price = e.error.data.errors.price.message;
              if(e.error.message.includes("categoryId")) this.errMsg.categoryId = e.error.data.errors.categoryId.message
              console.log(e.error);
          },
          () => {
              this._router.navigateByUrl(`product/single/view/${this.id}`)
          }
          )
      }
  }

  getSingle(){
    this._data.getSingleProduct(this.id).subscribe(
      result => {
        this.product = result.data
        // console.log(this.product)
        // console.log(this.product.categoryId)
        this.selectedCategory = this.product.categoryId
        this.editForm.patchValue(result.data)
      },
      e => {
        this.errMsg = e.message
      },
      () => { // finish
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

  onChangeImg(event:any){
    this.file = event.target.files[0]
  }
  
  submitImage(){
    this.myData.append("productImg", this.file, this.file.name)
    this._data.imgUpload(this.id, this.myData).subscribe(
      res => console.log(res),
      e => console.log(e)
    )
  }

}
