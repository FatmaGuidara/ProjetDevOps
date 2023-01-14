import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {

  id: any
  isLoaded: boolean = false
  errMsg: String = ""

  constructor(private _data:ProductService, private _activatedRoute:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"] //req.params.id
    this.deleteItem(this.id)
  }

  deleteItem(id:any){
    this._data.delProduct(id).subscribe(
      result => {
        console.log(result)
        this._router.navigateByUrl("product/myproducts")

      },
      e => {
        this.errMsg = e.message
        this.isLoaded = true
      },
      () => { // finish
        this.isLoaded = true
        // this._router.navigateByUrl("product/myproducts")
      }
    )

  }

}
