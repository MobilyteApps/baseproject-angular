import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss']
})
export class AccountVerifyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout((
    )=>{
    this.router.navigate["home"]
    },3000);
  }

}
