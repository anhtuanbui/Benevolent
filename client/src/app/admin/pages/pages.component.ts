import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bnv-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  addPage(){
    this.router.navigateByUrl('/admin/add-page');
  }

}
