import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
// import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: any
  returnUrl: any
  loginErrors
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
    });
    let params = this.activatedRoute.snapshot.params
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
    console.log("token", this.activatedRoute.snapshot.queryParams['returnUrl'])
    this.router.url
    if (params.token) {
      this._userService.verifyUser(params.token).subscribe(res => {
        console.log("sadfasfsdfsf", res)

      })
    }
  }
  logIn() {
    this._userService.login(this.userForm.value).subscribe(res => {

      if (res.success === true) {
        console.log("user authenticated", this.returnUrl, res)
        this.loginErrors=null
        this.returnUrl=res['data'].user.role=="admin"?"/admin":this.returnUrl
        this.router.navigate([this.returnUrl])
      } else {
        
        this.loginErrors = "Username or Password Incorrect"
        console.log("OOPS not authenticated", res);

      }
    })
  }

}
