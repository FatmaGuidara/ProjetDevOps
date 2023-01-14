import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imgUrl: string = "http://localhost:3000/"
  profile: any = []
  isLoaded: boolean= false
  errMsg: String = ""

  constructor(public _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this.getMyData()
  }

  getMyData(){
    this._auth.profile().subscribe(
      data=>{
        // console.log(data.data)
        this.profile = data.data
      },
      e=>{
        this.errMsg = e.message
        this.isLoaded = true
        this._router.navigateByUrl("/")
      },
      ()=>{
        this.isLoaded = true //finish
      }
    )
  }


}
