import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser
  constructor(
    private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.currentUser.subscribe((userData: any) => {
      console.log("logedin ", userData)
      this.currentUser = userData|| null
    });
  }
  logout() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }
}
