import { IRole, Role } from './../../shared/models/role';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl;
  private rolesSource = new BehaviorSubject<IRole[]>([]);
  roles$ = this.rolesSource.asObservable();
  roles: any;

  private roleSource = new BehaviorSubject<IRole>(new Role());
  role: any;

  constructor(private http: HttpClient) {}

  addRole(values: any) {
    return this.http.post(this.baseUrl + 'role/add', values);
  }

  editRole(id:string, values: any) {
    return this.http.post(this.baseUrl + `role/edit/${id}`, values);
  }


  getRoles() {
    return this.http.get(this.baseUrl + 'role').pipe(
      map((roles: any) => {
        this.rolesSource.next(roles);
        this.roles = this.rolesSource.value;
      })
    );
  }

  
  getRole(id: string) {
    return this.http.get(this.baseUrl + `role/${id}`).pipe(
      map((role: any) => {
        this.roleSource.next(role);
        this.role = this.roleSource.value;
      })
    );
  }

  deleteRole(id: string) {
    return this.http.delete(this.baseUrl + `role/delete/${id}`);
  }

}
