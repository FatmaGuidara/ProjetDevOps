import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/providers/services/auth.service";

@Component({
    selector: "app-edituser",
    templateUrl: "./edituser.component.html",
    styleUrls: ["./edituser.component.css"],
})
export class EdituserComponent implements OnInit {
    
    errMsg: any = {};
    profile: any = []
    file:any
    myData:FormData = new FormData()

    editForm: FormGroup = new FormGroup({
        name: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
        ]),
        email: new FormControl("", [Validators.email, Validators.required]),
        age: new FormControl("", [
            Validators.required,
            Validators.min(20),
            Validators.max(65),
        ]),
        gender: new FormControl("", [Validators.required]),
    });

    constructor(public _auth: AuthService, private _router: Router, private _activatedRoute:ActivatedRoute) { }

    get name() {
        return this.editForm.get("name");
    }
    get email() {
        return this.editForm.get("email");
    }
    get age() {
        return this.editForm.get("age");
    }
    get gender() {
        return this.editForm.get("gender");
    }

    ngOnInit(): void {
        if(this._auth.userData) this.editForm.patchValue(this._auth.userData)
        else this._router.navigateByUrl("user/login")
    }

    onChangeImg(event:any){
        this.file = event.target.files[0]
    }
    
    handleEdit(){
        if(this._auth.userData){
          this._auth.editUser(this._auth.userData?.["_id"], this.editForm.value)
          .subscribe(
            (res) => {
                if(this.file) this.submitImage()
                console.log(res);
            },
            (e) => {
                if (e.error.message.includes("name")) this.errMsg.name = e.error.data.errors.name.message;
                if (e.error.message.includes("email")) this.errMsg.email = e.error.data.errors.email.message;
                if (e.error.message.includes("age")) this.errMsg.age = e.error.data.errors.age.message;
                if (e.error.message.includes("gender")) this.errMsg.gender = e.error.data.errors.gender.message;
                console.log(e.error);
            },
            () => {
                this._router.navigateByUrl("user/profile")
            }
            )
        }
    }

    submitImage(){
      this.myData.append("myImg", this.file, this.file.name)
      this._auth.imgUpload(this.myData).subscribe(
        res => console.log(res),
        e => console.log(e)
      )
    }
}