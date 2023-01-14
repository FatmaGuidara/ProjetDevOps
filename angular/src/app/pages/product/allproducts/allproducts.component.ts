import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/providers/services/category.service';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
    selector: 'app-allproducts',
    templateUrl: './allproducts.component.html',
    styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

    products: any[] = []
    isLoaded: boolean = false
    errMsg: String = ""
    imgUrl = "http://localhost:3000/"

    constructor(public _product: ProductService, private _category: CategoryService) { }

    ngOnInit(): void {
        this.getMyData()
    }

    getMyData() {
        this._product.getAllProducts().subscribe(
            data => {this.products = data.data
            },
            e => {
                this.errMsg = e.message
                this.isLoaded = true
            },
            () => {
                this.isLoaded = true //finish
            }
        )
    }

}
