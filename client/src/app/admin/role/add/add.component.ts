import { RoleService } from './../role.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.roleService.addRole(this.addForm.value).subscribe(() => {
      this.router.navigateByUrl('/admin/role')
    });
  }
}
