import { IUser } from './../shared/models/user';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {
  currentUser$?: Observable<IUser>;
  constructor(private accountService:AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
}
