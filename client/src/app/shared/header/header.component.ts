import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  BREAK_POINT_1 = 1060;

  innerWidth: any;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

}
