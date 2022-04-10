import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITag } from 'src/app/shared/models/tag';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagsService } from 'src/app/admin/tags/tags.service';
import { PagesService } from '../pages.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  editPageForm!: FormGroup;
  tags: ITag[] = [];
  imageFile: any;
  imageBase64: any;
  imageSrc: any;

  id: number = 0;
  page: any;

  selectedTag: any; //not working

  public Editor = ClassicEditor;

  constructor(
    private tagsService: TagsService,
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get page id from url
    // get the page detail to put in the form
    this.id = this.route.snapshot.params['id'];

    // Create edit form
    // Add data to the form
    this.createEditPageForm();
    this.getTagList();
    this.getPage();
  }

  getPage() {
    this.pagesService.getPage(this.id).subscribe(() => {
      this.page = this.pagesService.page;

      // set value at this state for the form
      this.editPageForm.setValue({
        title: this.page.title,
        imageUrl: this.page.imageUrl,
        tagId: this.page.tagId,
        content: this.page.content,
      });

      this.selectedTag = this.page.tagId; // not working

      this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64, ' + this.page.imageUrl
      );
    });
  }

  getTagList() {
    this.tagsService.getTags().subscribe(() => {
      this.tags = this.tagsService.tags;
    });
  }

  createEditPageForm() {
    this.editPageForm = new FormGroup({
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
    this.editPage();
  }

  handleReaderLoaded(event: any) {
    var binaryString = event.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.imageBase64
    );
    this.editPageForm.patchValue({
      imageUrl: this.imageBase64,
    });
  }

  // things to do with pages services
  editPage() {
    this.pagesService.editPage(this.id, this.editPageForm.value).subscribe(() => {
      this.router.navigateByUrl('/admin/pages');
    });
  }

  onDiscard(){
    this.router.navigateByUrl('/admin/pages');
  }
}
