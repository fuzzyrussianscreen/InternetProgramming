import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('userToken') != null) {
      let roles = next.data["roles"] as Array<string>;
      if (roles) {
        var match = this.userService.roleMatch(roles);
        if (match) return true;
        else {
             this.toastr.success('Access is denied');
          return false;
        }
      }
      else
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
