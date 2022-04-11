import { ITag, Tag } from './../../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  baseUrl = environment.apiUrl;
  private tagsSource = new BehaviorSubject<ITag[]>([]);
  tags$ = this.tagsSource.asObservable();
  tags: ITag[] = [];

  private tagSource = new BehaviorSubject<ITag>(new Tag());
  tag: ITag = new Tag();

  constructor(private http: HttpClient) {}

  addTag(values: any) {
    return this.http.post(this.baseUrl + 'tag/add', values);
  }

  editTag(id:number, values: any) {
    return this.http.post(this.baseUrl + `tag/edit/${id}`, values);
  }


  getTags() {
    return this.http.get(this.baseUrl + 'tag/list').pipe(
      map((tags: any) => {
        this.tagsSource.next(tags);
        this.tags = this.tagsSource.value;
      })
    );
  }

  
  getTag(id: number) {
    return this.http.get(this.baseUrl + `tag/${id}`).pipe(
      map((tag: any) => {
        this.tagSource.next(tag);
        this.tag = this.tagSource.value;
      })
    );
  }

  deleteTag(id: number) {
    return this.http.delete(this.baseUrl + `tag/delete/${id}`);
  }

}
