import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isSlide: boolean = true;
  slides: any;
  constructor() {}
  slideChanged() {
    this.slides.startAutoplay();
  }
}
