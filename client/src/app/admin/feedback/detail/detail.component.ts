import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from './../feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  id: number = 0;
  feedback: any;

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFeedback();
  }

  getFeedback() {
    this.id = this.route.snapshot.params['id'];
    this.feedbackService.getFeedback(this.id).subscribe();
    this.feedback = this.feedbackService.feedbackValue();
  }
}
