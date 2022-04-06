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

  ngOnInit(): void {}
}
