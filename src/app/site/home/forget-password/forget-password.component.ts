import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetUserPwdForm: any;

  constructor(private activatedRoute: ActivatedRoute, private _toaster:ToasterService,
    private router: Router, private formBuilder: FormBuilder, private _userService: UserService) { }


  ngOnInit() {
    this.forgetUserPwdForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])]
    });
  }
  forgetPassword() {
    this._userService.forgetPassword(this.forgetUserPwdForm.value).subscribe(res => {
      console.log("forgot password call success", res)
      if (res && res['success']) {
        this._toaster.show('success', 'Well done!', 'Verification Email sent');
        console.log('email has been sent to the email')
      }
    })
  }

}
