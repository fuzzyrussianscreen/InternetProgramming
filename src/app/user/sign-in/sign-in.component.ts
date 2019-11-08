import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  user: User;

  roles: any[];
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (this.roles)
      this.roles.map(x => x.selected = false);
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.userAuthentication(form.value).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userRoles', data.role);
      this.toastr.success('User login successful');
      this.router.navigate(['/orders']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
}
