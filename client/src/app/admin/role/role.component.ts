import { IRole } from './../../shared/models/role';
import { RoleService } from './role.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: IRole[] = [];

  constructor(private router: Router, private roleService: RoleService) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRoles().subscribe(() => {
      this.roles = this.roleService.roles;
    });
  }

  addRole() {
    this.router.navigateByUrl('/admin/role/add');
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.getRoles();
    });
  }
}
