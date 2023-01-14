import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/providers/services/category.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  id: any
  errMsg: any = {}
  category: any = {}
  file: any
  myData:FormData = new FormData()

  editForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required])
  })

  get name() {
    return this.editForm.get("name");
  }
  
  constructor(private _category:CategoryService, private _activatedRoute:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"]
    this.getSingle()
  }

  handleEdit(){
    this._category.editCategory(this.id, this.editForm.value).subscribe(
      data => {
        if(this.file) this.submitImage()
      },
      e => {
        if (e.error.message.includes("name")) this.errMsg.name = e.error.data.message;
      },
      () => {
          this._router.navigateByUrl(`category`)
      }
)
  }

  getSingle(){
    this._category.singleCategory(this.id).subscribe(
      data => {
        this.category = data.data
        this.editForm.patchValue(this.category)
      },
      e => console.log(e)
    )
  }

  onChangeImg(event:any){
    this.file = event.target.files[0]
  }
  
  submitImage(){
    this.myData.append("categoryImg", this.file, this.file.name)
    this._category.imgUpload(this.id, this.myData).subscribe(
      res => console.log(res),
      e => console.log(e)
    )
  }
}
