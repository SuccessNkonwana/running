import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RunningService } from '../services/running.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  clubs= []
  isSlide: boolean = true;
  slides: any;
slideOpts = {
    slidesPerView: 2.5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
    }
  constructor(private  router:  Router,public runn: RunningService)
  {
    
    this.clubs=[]    
    this.getdata()
  }
  getdata()
  {
    return new Promise((resolve, reject) => {
      this.runn.rtClubs().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.clubs.push({ 
          todoKey:  data[x].todoKey,
          name:  data[x].name,
          time:  data[x].time,
          userID:  data[x].userID,
          photoURL:data[x].photoURL})
          
    
        }
      console.log(this.clubs,"LAST ONE")

     })
    })
  
  }
  slideChanged()
   {
    this.slides.startAutoplay();
   }
  go()
  {
    this.router.navigateByUrl("add-club")
  }
  // goHome()
  // {
  //   this.router.navigateByUrl("home")
  // }
  // gotoProfile(){
  //   this.router.navigateByUrl("profile")
  // }
  // gotoEvents(){
  //   this.router.navigateByUrl("events")
  // }
  // gotoAdd(){
  //   this.router.navigateByUrl("add")
  // }
//  getClubs()
//   {
     
//    this.runn.getClubs();
//   }

}
