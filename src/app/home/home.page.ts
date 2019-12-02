import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isSlide: boolean = true;
  slides: any;
  constructor(
    private  router:  Router
  ) {}
  slideChanged() {
    this.slides.startAutoplay();
  }
  go(){
    this.router.navigateByUrl("club-home")
  }
}
