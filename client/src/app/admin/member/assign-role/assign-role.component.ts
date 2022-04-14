import { AssignRole } from './../../../shared/models/assignRole';
import { RoleService } from './../../role/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from './../member.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
})
export class AssignRoleComponent implements OnInit {
  assignRoleForm!: FormGroup;
  assignRole = new AssignRole();

  member: any;

  roles: any;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getRoles();
    this.getMember();
  }

  getRoles() {
    this.roleService.getRoles().subscribe(() => {
      this.roles = this.roleService.roles;
    });
  }

  getMember() {
    this.memberService
      .getMember(this.route.snapshot.params['id'])
      .subscribe(() => {
        this.member = this.memberService.getCurrentMember();
      });
  }

  createAddForm() {
    this.assignRoleForm = new FormGroup({
      roleId: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.assignRole.memberId = this.route.snapshot.params['id'];
    this.assignRole.roleId = this.assignRoleForm.value.roleId;
    // console.log(this.assignRole);
    this.memberService.assignRole(this.assignRole).subscribe(() => {
      this.router.navigateByUrl('/admin/member');
    });
  }
}
