import { IToken, Token } from './../../shared/models/token';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { IUser, User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  iToken: IToken = new Token();
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(new User());
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUserValue() {
    return this.currentUserSource.value;
  }

  // loadCurrentUser(token: string) {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', `Bearer ${token}`);

  //   return this.http
  //     .get<IUser>(this.baseUrl + 'account/currentuser', { headers })
  //     .pipe(
  //       map((user: IUser) => {
  //         if (user.userName !== '') {
  //           console.log(user);
  //           localStorage.setItem('token', user.token);
  //           this.currentUserSource.next(user);
  //         }
  //       })
  //     );
  // }

  loadCurrentUser(token: string) {
    this.iToken.myToken = token;
    return this.http
      .post<IUser>(this.baseUrl + 'account/loginwithtoken', this.iToken)
      .pipe(
        map((user: IUser) => {
          if (user.userName !== '') {
            localStorage.setItem('token', user.token);
            this.currentUserSource.next(user);
          }
        })
      );
  }

  login(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user.userName !== '') {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/admin/pages');
        }
      })
    );
  }

  register(values: any) {
    return this.http
      .post<IUser>(this.baseUrl + 'account/register', values)
      .pipe(
        map((user: IUser) => {
          if (user.userName !== '') {
            console.log('Register succeeded');
          }
        })
      );
  }

  logout() {
    this.http.get<any>(this.baseUrl + 'account/logout');
    localStorage.removeItem('token');
    this.currentUserSource.next(new User());
    this.router.navigateByUrl('/');
  }

  isLogin() {
    return this.http
      .post<IUser>(
        this.baseUrl + 'account/loginwithtoken',
        localStorage.getItem('token')
      )
      .pipe(
        map((user: IUser) => {
          if (user.userName !== '') {
            this.currentUserSource.next(user);
            this.router.navigateByUrl('/admin/pages');
          } else {
            this.router.navigateByUrl('/admin/sign-in');
          }
        })
      );
  }
}
