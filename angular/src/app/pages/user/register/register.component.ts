import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/providers/services/auth.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

    errMsg: any = {}

    registerForm:FormGroup = new FormGroup({
        name: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
        ]),
        email: new FormControl("", [Validators.email, Validators.required]),
        age: new FormControl("", [Validators.required, Validators.min(20), Validators.max(65)]),
        password: new FormControl("", [
            Validators.required,
            // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
        ]),
        gender: new FormControl("", [Validators.required]),
    });
    constructor(private _auth:AuthService, private _router:Router) { }

    get name() {
        return this.registerForm.get("name");
    }
    get email() {
        return this.registerForm.get("email");
    }
    get age() {
        return this.registerForm.get("age");
    }
    get password() {
        return this.registerForm.get("password");
    }
    get gender() {
        return this.registerForm.get("gender");
    }

    ngOnInit(): void { }
    
    handleRegister() {
        let userData: User = this.registerForm.value
        this._auth.register(userData).subscribe(
            res=>{
                // console.log(res)
            },
            e =>{
                if(e.error.message.includes("name")) this.errMsg.name = e.error.data.errors.name.message
                if(e.error.message.includes("email")) this.errMsg.email = e.error.data.errors.email.message
                if(e.error.message.includes("password")) this.errMsg.password = e.error.data.errors.password.message
                if(e.error.message.includes("age")) this.errMsg.age = e.error.data.errors.age.message
                if(e.error.message.includes("gender")) this.errMsg.gender = e.error.data.errors.gender.message
                console.log(e.error)
            },
            () => {
                this._router.navigateByUrl("user/login")
            }
        )
    }
}
