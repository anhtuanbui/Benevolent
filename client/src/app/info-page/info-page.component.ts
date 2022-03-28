import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {
  innerWidth: any;
  innerHeight: any;

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
  
}
