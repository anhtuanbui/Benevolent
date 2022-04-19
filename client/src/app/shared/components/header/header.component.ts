import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from './../../../admin/pages/pages.service';
import { TagsService } from './../../../admin/tags/tags.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  BREAK_POINT_1 = 1060;

  innerWidth: any;

  tags: any;

  pages: any;


  constructor(
    private tagsService: TagsService,
    private pagesService: PagesService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getTags();
    this.getPages();
    this.getPagesOfTag('Services');
  }

  getTags() {
    this.tagsService.getTags().subscribe(() => {
      this.tags = this.tagsService.tags$;
    });
  }

  getPages() {
    this.pagesService.getPages().subscribe(() => {
      this.pages = this.pagesService.pages;
    });
  }

  getPagesOfTag(tag: string) {
    if (this.pages) {
      return this.pages.filter(
        (p: { tag: { name: string } }) => p.tag.name == tag
      );
    }
    return;
  }

  navigateTo(id: any) {
    this.router.navigateByUrl(`/page/${id}`).then(() => {
      window.location.reload();
    });
  }
}
