import { ITag } from './../../shared/models/tag';
import { TagsService } from './tags.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: ITag[] = [];

  constructor(private router: Router, private TagsService: TagsService) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.TagsService.getTags().subscribe(() => {
      this.tags = this.TagsService.tags;
    });
  }

  addTag() {
    this.router.navigateByUrl('/admin/add-tag');
  }

  deleteTag(id: number) {
    this.TagsService.deleteTag(id).subscribe(() => {
      this.getTags();
    });
  }
}
