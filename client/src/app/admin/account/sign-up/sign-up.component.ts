import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errors: any;

  response = new Observable();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmedPassword: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.accountService.register(this.signUpForm.value).subscribe(
      next => {},
      err => this.errors = err.error.Errors
    );
  }

}
