import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  myclubs
  clubs= [];
  hasAClub=false;
  isSlide: boolean = true;
  slides: any;
slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
    }
  constructor(public runn: RunningService, private router: Router, public loadingController: LoadingController,) {

    this.clubs=[]      
  //  this.getdata()
  
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
           clubKey:  data[x].clubKey,
           name:  data[x].name,
           openingHours:  data[x].openingHours,
           closingHours:  data[x].closingHours,
           userID:  data[x].userID,
           photoURL:data[x].photoURL})
           
     
         }
       console.log(this.clubs,"LAST ONE")
       
       if(this.clubs!=null)
       {
         this.hasAClub=true;
       }

      })
      this.presentLoading();
     })
    
   }
  ngOnInit() {
  
  }
  ngOnDestroy() {
    console.log('foo destroy')
  }
  ionViewDidEnter(){
    this.getdata()
  }
  ionViewDidLeave(){
    this.clubs=[]
    console.log("k");
     
  }

  getAClubsEvents(myclub){

    console.log(myclub);
     this.runn.getAClubsEvents(myclub)
    this.router.navigateByUrl('tabs/club-profile');


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 2000
    });
    await loading.present();
    // this.getdata()
    // loading.dismiss()
  }
  
  

}
