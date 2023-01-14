import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/providers/services/category.service';

@Component({
  selector: 'app-delcategory',
  templateUrl: './delcategory.component.html',
  styleUrls: ['./delcategory.component.css']
})
export class DelcategoryComponent implements OnInit {

  id: any

  constructor(private _category:CategoryService, private _activatedRoute:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"]
    this._category.delCategory(this.id).subscribe(
      data => {console.log("deleted")},
      e => {console.log(e)},
      () => {this._router.navigateByUrl("category")}
    )
  }

}
