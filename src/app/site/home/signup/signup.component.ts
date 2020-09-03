import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm:any;
  constructor(private formBuilder:FormBuilder,private _userService:UserService,private _toaster:ToasterService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      password: ['', Validators.compose([Validators.required,ValidationService.passwordValidator])],
      confirm_password:['',Validators.compose([Validators.required])], 
    }, { 
      validators: ValidationService.confirmPasswordValidator.bind(this)
    });
  }
  saveUser(){
    console.log("save user",this.userForm)
    this._userService.createUser(this.userForm.value).subscribe(res=>{
      console.log("user created",res)
      
      this._toaster.show('success', 'Success!', 'Signed Up Successfully');
    })
  }
}
