import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/services/auth.service';
import { CategoryService } from 'src/app/providers/services/category.service';

@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrls: ['./allcategories.component.css']
})
export class AllcategoriesComponent implements OnInit {

  categories:any[] = []
  isLoaded: boolean= false
  errMsg: String = ""
  imgUrl = "http://localhost:3000/"

  constructor(private _category:CategoryService, public _auth:AuthService) { }

  ngOnInit(): void {
    this.getMyData()
  }

  getMyData(){
    this._category.getAllCategories().subscribe(
      data=>{
        // console.log(data.data)
        this.categories = data.data
      },
      e=>{
        console.log(e.message)
        this.errMsg = e.message
        this._auth.isLoggedin = false
        this.isLoaded=true
      },
      ()=>{
        this.isLoaded = true
      }
    )
  }

}
