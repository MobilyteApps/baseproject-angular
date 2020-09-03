import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardAdmin implements CanActivate {
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this._userService.currentUserValue; 
        console.log("checking admin",currentUser)

        if (currentUser && currentUser["role"] == "admin" ) {
            console.log("admin")
            return true
        }else if(currentUser)
        this.router.navigate(['/home']) 
        else
        this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
        return false
    }   
}