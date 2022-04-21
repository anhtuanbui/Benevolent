import { AccountService } from '../../admin/account/account.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModOrAdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountService.checkModOrAdmin().pipe(
      map((r) => {
        if(r){
          return true;
        }
        this.router.navigate(['admin/sign-in'], {queryParams: {returnUrl:state.url}});
        return false;
      })
    );
  }
}
