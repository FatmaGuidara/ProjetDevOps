import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  products: any[] = []
  isLoaded: boolean = false
  errMsg: String = ""
  isEmpty: boolean = false
  imgUrl = "http://localhost:3000/"

  constructor(private _data:ProductService) { }

  ngOnInit(): void {
    this.getMyData()
  }

  getMyData(){
    this._data.myProducts().subscribe(
      data=>{
        // console.log(data.data)
        this.products = data.data
        
        if (this.products.length == 0) this.isEmpty = true
        else this.isEmpty = false
      },
      e=>{
        this.errMsg = e.message
        this.isLoaded = true
      },
      ()=>{
        this.isLoaded = true //finish
      }
    )
  }


}
