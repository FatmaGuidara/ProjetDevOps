import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/providers/services/auth.service';
import { CategoryService } from 'src/app/providers/services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  errMsg: any = {}
  id: any
  file: any
  myData:FormData = new FormData()

  categoryForm:FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    categoryImg: new FormControl(null)
  })

  constructor(private _category:CategoryService, private _router:Router, public _auth:AuthService) { }
  
  get name() {
    return this.categoryForm.get("name");
  }
  get categoryImg() {
    return this.categoryForm.get("categoryImg");
  }

  ngOnInit(): void {
  }

  handleCategory(){
    // let data: Category = this.categoryForm.value
    // let data = this.submitImage()
    // console.log(data)
    this.myData.set("name", this.name?.value)
    if(this.file) this.myData.set("categoryImg", this.categoryImg?.value)
    this._category.addCategory(this.myData).subscribe(
        res=>{
            // if(this.file) this.submitImage()
            console.log(res)
        },
        e =>{
            console.log(e.error)
            if (e.error?.message) {
              if(e.error.message.includes("name")) this.errMsg.name = e.error.data.errors.name.message
              if(e.error.message.includes("categoryImg")) this.errMsg.name = e.error.data.errors.name.message
            }
        },
        () => {
            this._router.navigateByUrl("category")
        }
    )
  }

  onChangeImg(event:any){
    this.file = event.target.files[0]
    this.categoryForm.patchValue({
      categoryImg: this.file,
    })
    // this.myData.append("categoryImg", this.file, this.file.name)
    console.log((this.categoryImg))
    // this.submitImage()
  }

  submitImage(){
    this.myData.append("name", this.name?.value)
    this.myData.append("categoryImg", this.categoryImg?.value)
    console.log(this.myData.get("name"))
    console.log(this.myData.get("categoryImg"))
    return this.myData
    // this.myData.append("categoryImg", this.file, this.file.name)
    // this._category.imgUpload(this.id, this.myData).subscribe(
      // res => console.log(res),
      // e => console.log(e.error)
    // )
  }

}
