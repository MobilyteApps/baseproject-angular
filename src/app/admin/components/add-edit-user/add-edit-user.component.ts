import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AdminUserService } from '../../services/admin-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  userForm: any;
  mode = "add";
  currentUser:any
  constructor(private formBuilder: FormBuilder,
    private _userService: UserService,
    private _adminservice: AdminUserService,
    private route: ActivatedRoute,
    private router: Router,
    private _toaster:ToasterService
  ) { }

  ngOnInit() {
    this.mode=this.route.snapshot.params.mode||"add"
    this.createForm(this.mode)

    // this.route.params.subscribe((params) => {
    //   console.log("parmMap", params)
    //   this.mode = params.mode;
      let user=localStorage.getItem(this.route.snapshot.params.user_id)
      localStorage.removeItem(this.route.snapshot.params.user_id)
      if(this.mode=="update" && user ){
        this.currentUser=JSON.parse(user)
        this.currentUser._id=this.route.snapshot.params.user_id
        console.log(this.currentUser)
        this.userForm.patchValue(this.currentUser)
      }
     
    // });
   

    
  }
  createForm(mode){
     this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([ ValidationService.emailValidator])]
      // password: ['', Validators.compose([mode=="add"?Validators.required: null, ValidationService.passwordValidator])],
      // confirm_password: ['', Validators.compose([mode=="add"?Validators.required: null])],
    }
    );
  
  }
  saveUser() {
    console.log("save user", this.userForm)
    if (this.mode == "add") {
      this.addUser(this.userForm.value)
    } else {
     this.updateUser(this.currentUser._id,this.userForm.value)
    }

  }
  addUser(user) {
    this._adminservice.addUser(user).subscribe(res => {
      this._toaster.show('success', 'Success!', 'User added Successfully');
      this.router.navigate(["admin"])
      console.log("user updated", res)
    })
  }
  updateUser(user_id,formData) {
    let user={_id:user_id }
    for(let key in formData){
      if(formData[key].trim())
      user[key]=formData[key];
    }
    console.log("update user",user_id,user)
    this._adminservice.updateUser(user_id,user).subscribe(res => {
      console.log("user update", res)
      this._toaster.show('success', 'Success!', 'User Updated Successfully');
      this.router.navigate(["admin"])
    })
  }
}
