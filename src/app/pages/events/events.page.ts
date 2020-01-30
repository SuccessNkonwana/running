import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  hasAEvent=true
  events= [];
  slideOpts= {
    initialSlide: 0,
    slidesPerView: 1.2,
    autoplay:true
   };
 
  constructor(public runn: RunningService,public route:Router, public loadingController: LoadingController) {

    this.events= []; 
    this.getdata()
   }
  //  date1;
   getdata()
   {
     console.log(this.runn.rtEvents())
     this.runn.getEvent().subscribe(eventList=>{
       for(let x=0;x< eventList.length;x++){
        this.events.push({
          eventKey:eventList[x].id,
          name: eventList[x].name,
          address:eventList[x].address,
          openingHours:eventList[x].openingHours,
          closingHours:eventList[x].closingHours,
          price:eventList[x].newPrice,
          clubKey:eventList[x].clubID,
          date:eventList[x].date,
          photoURL:eventList[x].photoURL
        })
        console.log("<<<<<",this.events[x])
       }
       
     })

 
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
  
   book()
   {

    this.route.navigate(['/book-event']);
 
   
   }
   booking(myevents){
    this.runn.booking(myevents)
   }
  ngOnInit() {
  }

}
