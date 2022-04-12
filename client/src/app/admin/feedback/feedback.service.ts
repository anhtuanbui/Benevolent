import { Feedback, IFeedback } from './../../shared/models/feedback';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  baseUrl = environment.apiUrl;
  private feedbacksSource = new BehaviorSubject<IFeedback[]>([]);
  feedbacks$ = this.feedbacksSource.asObservable();
  feedbacks: IFeedback[] = [];

  private feedbackSource = new BehaviorSubject<IFeedback>(new Feedback());
  feedback$ = this.feedbacksSource.asObservable();
  feedback: any;

  constructor(private http: HttpClient) { }

  getFeedbacks() {
    return this.http.get(this.baseUrl + 'feedback').pipe(
      map((feedback: any) => {
        this.feedbacksSource.next(feedback);
        this.feedbacks = this.feedbacksSource.value;
      })
    );
  }

  getFeedback(id: number) {
    return this.http.get(this.baseUrl + `feedback/detail/${id}`).pipe(
      map((feedback: any) => {
        this.feedbackSource.next(feedback);
        this.feedback = this.feedbackSource.value;
      })
    );
  }

  addFeedback(values: any) {
    return this.http.post(this.baseUrl + 'feedback/add', values);
  }

  deleteFeedback(id:number){
    return this.http.delete(this.baseUrl + `feedback/delete/${id}`);
  }

  checkFeedback(id:number){
    return this.http.get(this.baseUrl + `feedback/check/${id}`);
  }

  feedbackValue(){
    return this.feedbackSource.value;
  }
}
