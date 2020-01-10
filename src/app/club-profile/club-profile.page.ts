import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.page.html',
  styleUrls: ['./club-profile.page.scss'],
})
export class ClubProfilePage implements OnInit {
  isSlide: boolean = true;
  slides: any;
  slideOpts = {
    slidesPerView: 1.5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
    }
  constructor() { }
  slideChanged()
  {
   this.slides.startAutoplay();
  }
  ngOnInit() {
  }

}
