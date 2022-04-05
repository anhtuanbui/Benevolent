import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  // a known issue on html file
  
  public Editor = ClassicEditor;

  addPage = new FormGroup({
    image: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
  });

  value = 'clear this';

  constructor() {}

  ngOnInit(): void {}
}
