import { DomSanitizer } from '@angular/platform-browser';
import { PagesService } from './../admin/pages/pages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {
  innerWidth: any;
  innerHeight: any;

  id = 0;

  page: any;

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.getPage();
  }

  getPage() {
    this.id = this.route.snapshot.params['id'];
    this.pagesService.getPage(this.id).subscribe(() => {
      this.page = this.pagesService.page;

      if (this.page.imageUrl) {
        this.page.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64, ' + this.page.imageUrl
        );
      }
    });
  }
}
