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

  constructor(private router: Router, private tagsService: TagsService) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.tagsService.getTags().subscribe(() => {
      this.tags = this.tagsService.tags;
    });
  }

  addTag() {
    this.router.navigateByUrl('/admin/add-tag');
  }

  deleteTag(id: number) {
    this.tagsService.deleteTag(id).subscribe(() => {
      this.getTags();
    });
  }
}
