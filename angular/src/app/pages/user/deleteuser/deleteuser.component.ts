import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  id: any
  isLoaded: boolean = false
  errMsg: String = ""

  constructor(private _auth:AuthService, private _activatedRoute:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"] //req.params.id
    this.deleteItem(this.id)
  }

  deleteItem(id:any){
    this._auth.delUser(id).subscribe(
      result => {
        console.log(result)
        this._router.navigateByUrl("/user/register")
        localStorage.removeItem('g21Token')
        this._auth.isLoggedin = false
      },
      e => {
        this.errMsg = e.message
        this.isLoaded = true
        this._auth.isLoggedin = true
      },
      () => { // finish
        this.isLoaded = true
        this._auth.isLoggedin = false
      }
    )

  }


}
