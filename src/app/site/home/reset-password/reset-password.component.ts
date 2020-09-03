import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetUserPwdForm: any;
  reset = true;
  params: any;
  constructor(private activatedRoute: ActivatedRoute, private _toaster: ToasterService,
    private router: Router, private formBuilder: FormBuilder, private _userService: UserService) { }


  ngOnInit() {
    this.params = this.activatedRoute.snapshot.queryParams;
    console.log("query params", this.activatedRoute.snapshot.queryParams)
    if (this.params.token && this.params._id) {
      console.log(this.params)
      this.reset = true;
      this.createForm(!this.reset)
    } else {
      const currentUser = this._userService.currentUserValue;
      if (currentUser) {
        console.log("in")
        this.reset = false;
        this.createForm(!this.reset)
      } else {
        this.router.navigate(["/login"])
      }
    }

  }
  createForm(oldPassword) {
    let form: any = {
      password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      confirm_password: ['', Validators.compose([Validators.required])]
    }
    if (oldPassword)
      form.oldPassword = ['', Validators.compose([Validators.required, ValidationService.passwordValidator])]

    this.resetUserPwdForm = this.formBuilder.group(form, {
      validators: ValidationService.confirmPasswordValidator.bind(this)
    });
  }
  savePwd() {
    console.log("saved ",this.reset)
    if (this.reset) {
      this.updatePwd()
    } else {
      this.resetpwd()
    }
  }
  resetpwd() {
    let data= {

      oldPassword:this.resetUserPwdForm.value.oldPassword,
      password: this.resetUserPwdForm.value.password,
      _id: this.params._id
      }
      this._userService.resetPassword(data).subscribe(res=>{
        if (res && res['success']) {
          this._toaster.show("success", "Success", "Password Reset")
        }
      })
  }
   updatePwd(){
    let data = {
      password: this.resetUserPwdForm.value.password,
      _id: this.params._id
    }
    this._userService.updatePassword(data).subscribe(res => {
      if (res && res['success']) {
        this._toaster.show("success", "Success", "Password Updated")
      }
    })
  }
}
