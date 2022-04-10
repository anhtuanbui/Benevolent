import { Router } from '@angular/router';
import { TagsService } from './../tags.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss'],
})
export class AddTagComponent implements OnInit {
  addTagForm!: FormGroup;

  constructor(private tagsService: TagsService, private router: Router) {}

  ngOnInit(): void {
    this.createAddTagForm();
  }

  createAddTagForm() {
    this.addTagForm = new FormGroup({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.tagsService.addTag(this.addTagForm.value).subscribe(() => {
      this.router.navigateByUrl('/admin/tags')
    });
  }
}
