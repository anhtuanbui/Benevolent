import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './admin/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  isLogin = false;

  constructor(private router: Router, private accountService: AccountService) {}


  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');

    if(token){
      this.accountService.loadCurrentUser(token).subscribe(() => {
        this.isLogin = true;
      });
    }
  }
}
