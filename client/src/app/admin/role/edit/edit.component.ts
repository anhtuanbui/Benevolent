import { Role } from './../../../shared/models/role';
import { RoleService } from './../role.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editForm!: FormGroup;
  id = '';

  role = new Role();

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.setFormValue();
    this.createEditRoleForm();
  }

  setFormValue() {
    this.roleService.getRole(this.id).subscribe(() => {
      this.role = this.roleService.role;
      this.editForm.setValue({
        name: this.role.name,
      });
    });
  }

  createEditRoleForm() {
    this.editForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.roleService.editRole(this.id, this.editForm.value).subscribe(() => {
      this.router.navigateByUrl('/admin/role');
    });
  }
}
