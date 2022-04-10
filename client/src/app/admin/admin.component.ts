import { AccountService } from './account/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService) {}

  isLogin = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token){
      this.accountService.loadCurrentUser(token).subscribe(() => {
        this.isLogin = true;
      });
    }

    // if (this.isLogin === false) {
    //   this.router.navigateByUrl('/admin/sign-in');
    // }else{
    //   this.router.navigateByUrl('/admin/pages');
    // }
  }
}
