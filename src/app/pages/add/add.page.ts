import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  clubs= [];
  hasAClub=false;
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
  constructor(public runn: RunningService) {

    this.clubs=[]      
    this.getdata()
   }
   slideChanged()
   {
    this.slides.startAutoplay();
   }
   getdata()
   {
     return new Promise((resolve, reject) => {
       this.runn.rtMyClubs().then(data =>{
      
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
       if(this.clubs!=null)
       {
         this.hasAClub=true;

       }
      })
     })
          
   }
  ngOnInit() {
  }

}
