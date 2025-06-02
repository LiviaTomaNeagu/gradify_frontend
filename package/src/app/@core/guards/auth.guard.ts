import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { CurrentUserResponseInterfaceDTO } from "../interfaces/user.interface";
import { CurrentUserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private currentUser: CurrentUserService, private router:Router) {}
  canActivate(
    
  ): boolean {
    console.log(this.currentUser.getCurrentUserInfo())
    if(!this.currentUser.getCurrentUserInfo()){
        this.router.navigate(['/auth/login']);
        return false;
    }
    return true;
  }
}