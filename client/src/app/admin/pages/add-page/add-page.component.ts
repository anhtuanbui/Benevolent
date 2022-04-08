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
  addPage! : FormGroup
  public Editor = ClassicEditor;

  value = 'clear this';

  constructor() {}

  ngOnInit(): void {
    this.createAddPageForm();
  }

  createAddPageForm(){
    this.addPage = new FormGroup({
      image: new FormControl(''),
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
    });
  }
}
