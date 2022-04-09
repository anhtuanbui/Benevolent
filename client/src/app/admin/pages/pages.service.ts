import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addPage(values: any){
    return this.http.post(this.baseUrl + 'page/add', values);
  }
}
