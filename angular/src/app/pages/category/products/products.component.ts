import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/providers/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  id: any
  products: any[] = []
  isLoaded: boolean = false
  isEmpty: boolean = false
  errMsg: string = ""
  imgUrl = "http://localhost:3000/"

  constructor(private _category:CategoryService, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"]
    this.getProducts()
  }

  getProducts(){
    this._category.products(this.id).subscribe(
      data => {
        this.products = data.data
        if(this.products.length == 0) this.isEmpty = true
        else this.isEmpty = false
        // console.log(this.products)
      },
      e => {
        console.log(e)
        this.errMsg = e.message
        this.isLoaded = true
      },
      () => {this.isLoaded = true}
    )
  }

}
