import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  isLoginError: boolean = false;
  user: User;
  roles: any[];
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.resetForm();

    this.userService.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }

  resetForm(form?: NgForm) {
    if (this.roles)
      this.roles.map(x => x.selected = false);
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: ''
    }

  }

  OnSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    this.userService.registerUser(form.value, x)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.toastr.success('User registration successful');

          this.userService.userAuthentication(form.value).subscribe((data: any) => {
            localStorage.setItem('userToken', data.access_token);
            localStorage.setItem('userRoles', data.role);
            this.toastr.success('User login successful');
            this.router.navigate(['/orders']);

            this.resetForm();
          },
            (err: HttpErrorResponse) => {
              this.isLoginError = true;
            });
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }


}
