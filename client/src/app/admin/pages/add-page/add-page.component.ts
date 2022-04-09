import { PagesService } from './../pages.service';
import { ITag } from './../../../shared/models/tag';
import { TagsService } from './../../tags/tags.service';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  addPageForm!: FormGroup;
  tags: ITag[] = [];
  imageFile: any;
  imageBase64: any;
  imageSrc: any;

  public Editor = ClassicEditor;

  value = 'clear this';

  constructor(
    private tagsService: TagsService,
    private pagesService: PagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.createAddPageForm();
    this.getTagList();
  }

  getTagList() {
    this.tagsService.getTags().subscribe(() => {
      this.tags = this.tagsService.tags;
    });
  }

  createAddPageForm() {
    this.addPageForm = new FormGroup({
      imageUrl: new FormControl(''),
      tagId: new FormControl(''),
      title: new FormControl('', Validators.required),
      content: new FormControl(''),
    });
  }

  onImageChange($event: any) {
    this.imageFile = $event.target.files[0];
    if (this.imageFile) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.imageFile);
    }
  }

  onSubmit() {
    this.addPage();
  }

  handleReaderLoaded(event: any) {
    var binaryString = event.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.imageBase64
    );
    this.addPageForm.patchValue({
      imageUrl: this.imageBase64,
    });
  }

  // things to do with pages services
  addPage(){
    this.pagesService.addPage(this.addPageForm.value).subscribe(()=>{
      console.log('succeeded');
    })
  }
}
