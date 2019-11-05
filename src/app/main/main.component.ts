import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
userClaims: any;
    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
      this.userService.getUserClaims().subscribe((data: any) => {
        this.userClaims = data;

      });
    }

    Logout() {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    }

}
