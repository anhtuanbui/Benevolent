import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  changePassword = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmedNewPassword: new FormControl(''),
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.accountService
      .changePassword(this.changePassword.value)
      .subscribe(() => {
        this.snackbar.open('The password has changed successfully', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: 'snackbar-success'
        });
        this.changePassword.reset();
      });
  }
}
