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
  isLoginError : boolean = false;
    user: User;
  constructor(private userService: UserService, private toastr: ToastrService, private router : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
    this.user = {
      UserName: '',
      Password: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.toastr.success('User registration successful');

          this.userService.userAuthentication(form.value).subscribe((data : any)=>{
           localStorage.setItem('userToken',data.access_token);
           this.toastr.success('User login successful');
           this.router.navigate(['/orders']);

         },
         (err : HttpErrorResponse)=>{
           this.isLoginError = true;
         });
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }


}
