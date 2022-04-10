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

  constructor(private http: HttpClient) {}

  getPages() {
    return this.http.get(this.baseUrl + 'page').pipe(
      map((page: any) => {
        this.pagesSource.next(page);
        this.pages = this.pagesSource.value;
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
    return this.http.get(this.baseUrl + `page/delete/${id}`);
  }
}
