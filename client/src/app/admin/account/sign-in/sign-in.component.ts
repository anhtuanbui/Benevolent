import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  createSignInForm() {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.accountService.login(this.signInForm.value).subscribe(() => {
      console.log('user logged in');
    }, error => {
      console.log(error);
    });
  }

}
