import { Router } from '@angular/router';
import { FeedbackService } from './feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  feedbacks:any;
  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(()=>{
      this.feedbacks = this.feedbackService.feedbacks;
      console.log(this.feedbacks);
    })
  }

  deleteFeedback(id:number){
    this.feedbackService.deleteFeedback(id).subscribe(()=>{
      this.getFeedbacks();
    })
  }

  checkFeedback(id:number){
    this.feedbackService.checkFeedback(id).subscribe(()=>{
      this.getFeedbacks();
    });
  }
}
