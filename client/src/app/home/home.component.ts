import { PagesService } from './../admin/pages/pages.service';
import { Router } from '@angular/router';
import { FeedbackService } from './../admin/feedback/feedback.service';
import { FormGroup, FormControl } from '@angular/forms';
// using swiper js && keen slider
// documentation https://swiperjs.com/angular

import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

import SwiperCore, {
  Swiper,
  Virtual,
  Pagination,
  Autoplay,
  Controller,
  Scrollbar,
  Navigation,
  Lazy,
} from 'swiper';
import { AutoplayOptions } from 'swiper/types';
import { IPage } from '../shared/models/page';

SwiperCore.use([
  Virtual,
  Navigation,
  Pagination,
  Controller,
  Autoplay,
  Scrollbar,
  Lazy,
]);

const SLIDER_TIMEOUT = 3000;
@Component({
  selector: 'bnv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('sliderRef') sliderRef?: ElementRef<HTMLElement>;

  TABLET_BREAKPOINT = 960;
  PHONE_BREAKPOINT = 480;

  innerWidth: any;

  slider?: KeenSliderInstance;

  currentSlide: number = 1;
  dotHelper: Array<Number> = [];

  viewInKeenSlider: number = 3;

  cards: string[] = [
    'Translating services',
    'Our commitment to your safety and wellbeing. ',
    'Your right and responsibilities',
    'Our Commitment to LGBTQI+ community ',
    'Our Commitment to Aboriginal and Torres Strait Islander Peoples',
    'Feedback and complaints',
  ];

  pages: IPage[] = [];

  pagesLoaded?: Promise<boolean>;

  feedbackForm: FormGroup = new FormGroup({});

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private pagesService: PagesService
  ) {}
  ngOnInit(): void {
    this.getPages();
    this.addMatchHeight();
    this.innerWidth = window.innerWidth;
    this.createFeedbackForm();
  }

  ngAfterViewInit(): void {
  }
  
  ngOnDestroy(): void {
    this.removeMatchHeight();
    if (this.slider) this.slider.destroy();
  }
  
  getPages() {
    this.pagesService.getPagesWithSanitizedImage().subscribe(() => {
      this.pages = this.pagesService.pagesImageSanitized;
      this.setSlider();
    });
  }

  createFeedbackForm() {
    this.feedbackForm = new FormGroup({
      fullName: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      surburb: new FormControl(''),
      timeToCall: new FormControl(''),
      message: new FormControl(''),
    });
  }

  // Create and send feedback to admin
  sendFeedback(values: any) {
    this.feedbackService.addFeedback(values).subscribe(() => {
      this.router.navigateByUrl('/send-feedback-success');
    });
  }

  onFeedbackSubmit() {
    this.sendFeedback(this.feedbackForm.value);
  }

  addMatchHeight() {
    window.addEventListener('resize', () => {
      this.cardHeightCalc();
    });
  }

  removeMatchHeight() {
    window.removeEventListener('resize', () => {
      this.cardHeightCalc();
    });
  }

  cardHeightCalc() {
    const cards = document.querySelectorAll<HTMLElement>('.scroll-box-card');
    cards.forEach((item) => {
      let height = (item.offsetWidth * 320) / 420;
      item.style.height = height + 'px';
    });
  }

  // set window size to innerWidth
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  setSlider() {
    if (this.innerWidth < this.PHONE_BREAKPOINT) {
      this.viewInKeenSlider = 1;
    } else if (this.innerWidth < this.TABLET_BREAKPOINT) {
      this.viewInKeenSlider = 2;
    } else {
      this.viewInKeenSlider = 3;
    }
    setTimeout(() => {
      this.slider = new KeenSlider(
        this.sliderRef!.nativeElement,
        {
          initial: this.currentSlide,
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel;
          },
          loop: true,
          mode: 'free-snap',
          slides: {
            perView: this.viewInKeenSlider,
            spacing: 15,
          },
        },
        [
          (slider) => {
            let timeout: any;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(timeout);
            }
            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
                slider.next();
              }, SLIDER_TIMEOUT);
            }
            slider.on('created', () => {
              slider.container.addEventListener('mouseover', () => {
                mouseOver = true;
                clearNextTimeout();
              });
              slider.container.addEventListener('mouseout', () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });
            slider.on('dragStarted', clearNextTimeout);
            slider.on('animationEnded', nextTimeout);
            slider.on('updated', nextTimeout);
          },
        ]
      );
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ];
    });
  }
}
