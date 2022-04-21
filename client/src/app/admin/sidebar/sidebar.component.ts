import { IUser, User } from './../../shared/models/user';
import { AccountService } from './../account/account.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'bnv-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentUser$!: Observable<IUser>;
  currentUserRoles$:Observable<string[]> = new Observable(subscriber => {
    subscriber.next([]);
  })

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }
}
