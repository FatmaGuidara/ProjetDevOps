import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsloginGuard implements CanActivate {
  constructor(private _auth:AuthService, private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!localStorage.getItem("g21Token")){
        window.alert("You must login first!")
        this._router.navigateByUrl("/user/login")
        return false
      }
    return true;
  }
  
}
