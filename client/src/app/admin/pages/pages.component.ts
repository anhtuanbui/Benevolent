import { DomSanitizer } from '@angular/platform-browser';
import { IPage } from './../../shared/models/page';
import { PagesService } from './pages.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  pages: any[] = [];

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getPages();
  }

  getPages() {
    this.pagesService.getPages().subscribe(() => {
      this.pages = this.pagesService.pages;
      this.pages.forEach((page) => {
        page.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + page.imageUrl
        );
      });
    });
  }

  addPageBtn() {
    this.router.navigateByUrl('/admin/add-page');
  }

  deletePage(id:number){
    this.pagesService.deletePage(id).subscribe(() => {
      this.getPages();
    });
  }
}
