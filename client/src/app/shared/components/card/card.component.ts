import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() page:any;

  constructor() { }

  ngOnInit(): void {
  }


}
