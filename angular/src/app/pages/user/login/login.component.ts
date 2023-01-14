import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/providers/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    
    errMsg: any = {};

    loginForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.email, Validators.required]),
        password: new FormControl("", [Validators.required]),
    });
    constructor(private _auth: AuthService, private _router:Router) { }

    get email() {
        return this.loginForm.get("email");
    }
    get password() {
        return this.loginForm.get("password");
    }

    ngOnInit(): void {
        if(this._auth.isLoggedin) this._router.navigateByUrl("/profile")
    }

    handleLogin() {
        let userData: any = this.loginForm.value
        this._auth.login(userData).subscribe(
            res=>{
                localStorage.setItem("g21Token", res.data.token)
                this._auth.isLoggedin = true
                this._auth.userData = res.data.userData
            },
            e =>{
                console.log(e.error)
                if(e.error.message.includes("email")) this.errMsg.email = e.error.message
                if(e.error.message.includes("password")) this.errMsg.password = e.error.message
            },
            () => {
                this._router.navigateByUrl("user/profile")
            }
        )

    }
}
