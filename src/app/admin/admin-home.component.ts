import { Component, OnInit } from '@angular/core';
import { AdminUserService } from './services/admin-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../shared/services/toaster.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  usersList
  users = []
  itemsPerPage = 2;
  currentPage = 1
  totalItems = 10
  constructor(private _adminService: AdminUserService,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,



    private _toaster: ToasterService






  ) { }

  ngOnInit() {
    this._adminService.fetchAllUsers().subscribe(res => {
      console.log("res is ", res)
      // this.usersList = res["data"] //for temporary use until server side pagination
      this.users = res["data"]//.slice(this.currentPage-1,this.itemsPerPage)
      // this.totalItems = res["data"].totalItems
    })
    // this.route.queryParams.subscribe(
    //   params => this.currentPage = params['page'] ? params['page'] : 1);

    // for (let i = 1; i <= 100; i++) {
    // this.collection.push(`item ${i}`);
    // }
  }
  addUser() {
    this.router.navigate(["/admin/user/add"])
  }
  updateUser(index, user) {
    console.log("update", user)
    localStorage.setItem(user._id, JSON.stringify({ username: user.username, email: user.email }))//temporary
    this.router.navigate(["/admin/user/update", user._id])
  }
  deleteUser(index, user) {
    console.log("update", index, user)
    let i = this.users.map(r => r._id).indexOf(user._id)

    // // this.totalItems=this.totalItems-1
    // this.usersList.splice(i, 1)
    // this.itemsPerPage-=1 
    // if(this.itemsPerPage) 
    this.users.splice(i, 1);
    this._adminService.deleteUser(user._id).subscribe((res) => {
      console.log("userdeleted", res)
      this._toaster.show("success", "User Deleted Perminantly")
    })



  }
  pageChanged(newPage: number, pp?) {
    console.log(newPage, this.itemsPerPage, this.totalItems, pp)
    this.router.navigate(['admin'], { queryParams: { page: newPage } });
    // this.currentPage = pageno
    // this.users = this.usersList//.slice(this.currentPage,this.itemsPerPage)
  }
  changeStatus(i, user) {
    // user.isActive=!user.isActive
    // console.log("accccccccccccccc",this.users.find(u=>u._id==user._id).isActive=false)
    // return
    this._adminService.change(user._id, user).subscribe((res) => {
      console.log("status changed", res['data'])
      if (res && res['success']) {
      // this.users.find(u=>u._id==res['data']._id).isActive=res['data'].isActive
      // user.isActive=res['data'].isActive
      user.isActive = !user.isActive
      this._toaster.show("success", "Success", `User is ${user.isActive ? 'active' : 'Inactive'} now`)
      }
    })
  }
  forgetPassword(i, user) {
    this._userService.forgetPassword({ email: user.email }).subscribe(res => {
      console.log("forgot password call success", res)
      if (res && res['success']) {
        this._toaster.show('success', 'Sucess!', 'Verification Email sent to User');
        console.log('email has been sent to the email')
      }
    })
  }
  getActiveStatus = (user) => {
    if (user && user.isActive) {
      return 'active';
    }
    return 'inActive';
  }
}
