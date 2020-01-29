import { Component, OnInit } from '@angular/core';
import { RunningService } from '../services/running.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.page.html',
  styleUrls: ['./club-profile.page.scss'],
})
export class ClubProfilePage implements OnInit {
  clubs=[]
  hasAEvent=true
  clubName:String=""
  photoURL:String=""
  events= [];
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
  constructor(public runn: RunningService, public loadingController: LoadingController) {
    this.clubs=[] 
    this.events= []; 
    this.clubName=null
  this.photoURL=null    
    this.getdata()
   

   }
  slideChanged()
  {
   this.slides.startAutoplay();
  }
  ngOnInit() {
    // this.presentLoading();
  }
 

  getdata()
  {
    this.clubs=[] 
    this.events= []; 
  this.clubName=null
  this.photoURL=null
  this.clubs= this.runn.rtClubName() 
  this.clubName=this.clubs[0].myclubs.name
  this.photoURL=this.clubs[0].myclubs.photoURL
  console.log(this.clubs," $$$$$$$$$$$$");
  console.log(this.clubName," $$$$$$$$$$$$");
  console.log(this.photoURL,"$$$$$$$$$");

    return new Promise((resolve, reject) => {
      this.runn.rtClubEvents().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.events.push({ 
          eventKey:  data[x].eventKey,
          name:  data[x].name,
          address:  data[x].address,
          openingHours:  data[x].openingHours,
          closingHours:data[x].closingHours,
          newPrice:data[x].newPrice,
          photoURL:data[x].photoURL,
          clubKey:data[x].clubKey
        
        })
         
        }
         if(this.events===null)
         {
           this.hasAEvent=false
         }
 
      console.log(this.events,"LAST ONE")

     })
    })
  
  }
  currentClub(myclubs)
  {

    console.log(myclubs+"@@@@@@@@@@")
    this.runn.currentClub(myclubs)
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 4000
    });
    await loading.present();
    this.getdata()
    loading.dismiss()
  }
}
