import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  error: any;
  returnUrl:string = '';

  response = new Observable();

  constructor(private accountService: AccountService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.createSignInForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin/pages';
  }

  createSignInForm() {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.accountService.login(this.signInForm.value).subscribe(
      next => {
        let user = this.accountService.getCurrentUserValue();
        if (user.roles.length > 0){
          this.router.navigateByUrl(this.returnUrl);
        }else{
          this.router.navigateByUrl('/admin');
        }
      },
      err => {
        this.error = err.error;
        
      }
    );
  }
}
