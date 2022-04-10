import { Tag } from './../../../shared/models/tag';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsService } from '../tags.service';

@Component({
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss'],
})
export class EditTagComponent implements OnInit {
  editTagForm!: FormGroup;
  id = 0;

  tag = new Tag();

  constructor(
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.setFormValue();
    this.createEditTagForm();
  }

  setFormValue() {
    this.tagsService.getTag(this.id).subscribe(() => {
      this.tag = this.tagsService.tag;
      this.editTagForm.setValue({
        name: this.tag.name,
        position: this.tag.position,
      });
    });
  }

  createEditTagForm() {
    this.editTagForm = new FormGroup({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.tagsService.editTag(this.id, this.editTagForm.value).subscribe(()=>{
      this.router.navigateByUrl('/admin/tags');
    });
  }
}
