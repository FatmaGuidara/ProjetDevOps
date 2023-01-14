import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('g21Token')) this.profile()
  }

  profile(){
    this._auth.profile().subscribe(
      res=>{
        this._auth.userData = res.data
      },
      err=>{
        this._auth.isLoggedin = false
        this._auth.userData = null
        this._router.navigateByUrl("/")
      },
      ()=>{
        this._auth.isLoggedin = true
      }
    )
  }
}
