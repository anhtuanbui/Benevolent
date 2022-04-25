import { DomSanitizer } from '@angular/platform-browser';
import { IPage, Page } from './../../shared/models/page';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  baseUrl = environment.apiUrl;
  private pagesSource = new BehaviorSubject<IPage[]>([]);
  pages$ = this.pagesSource.asObservable();
  pages: IPage[] = [];

  private pageSource = new BehaviorSubject<IPage>(new Page());
  page$ = this.pagesSource.asObservable();
  page: any;

  pagesImageSanitized: IPage[] = [];

  constructor(private http: HttpClient, private sanitizer:DomSanitizer) {}

  getPages() {
    return this.http.get(this.baseUrl + 'page').pipe(
      map((page: any) => {
        this.pagesSource.next(page);
        this.pages = this.pagesSource.value;
      })
    );
  }

  getPagesWithSanitizedImage() {
    return this.http.get(this.baseUrl + 'page').pipe(
      map((page: any) => {
        this.pagesSource.next(page);
        this.pagesImageSanitized = this.pagesSource.value;
        this.pagesImageSanitized.forEach((page) => {
          page.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + page.imageUrl);
        })
      })
    );
  }


  getPage(id: number) {
    return this.http.get(this.baseUrl + `page/detail/${id}`).pipe(
      map((page: any) => {
        this.pageSource.next(page);
        this.page = this.pageSource.value;
      })
    );
  }

  addPage(values: any) {
    return this.http.post(this.baseUrl + 'page/add', values);
  }

  editPage(id: number, values: any) {
    return this.http.post(this.baseUrl + `page/edit/${id}`, values);
  }

  deletePage(id:number){
    return this.http.delete(this.baseUrl + `page/delete/${id}`);
  }
}
