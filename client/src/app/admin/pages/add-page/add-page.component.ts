import { ITag } from './../../../shared/models/tag';
import { TagsService } from './../../tags/tags.service';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  addPageForm! : FormGroup
  tags: ITag[] = [];

  public Editor = ClassicEditor;

  value = 'clear this';

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.createAddPageForm();
    this.getTagList();
  }
  
  getTagList(){
    this.tagsService.getTags().subscribe(() => {
      this.tags = this.tagsService.tags;
      console.log(this.tags);
    });

  }

  createAddPageForm(){
    this.addPageForm = new FormGroup({
      image: new FormControl(''),
      tag: new FormControl(''),
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
    });
  }

  onSubmit(){
    console.log(this.addPageForm.value);
  }
}
