import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-prototype';
  currentUser:any
  constructor(private _userService:UserService,private router:Router){

  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
}
ngOnInit(){
  this._userService.currentUser.subscribe((user:any) => {
    console.log("logedin ",user)
    this.currentUser = user ||null
  });
}

logout() {
    this._userService.logout();
    this.currentUser=null
    this.router.navigate(['/login']);
}
}
