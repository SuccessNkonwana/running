import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';
import { Router } from '@angular/router';

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
 
  constructor(public runn: RunningService,public route:Router) {

    this.events= []; 
    this.getdata()
   }
   getdata()
   {

   return new Promise((resolve, reject) => {
       this.runn.rtEvents().then(data =>{
      
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
           price:data[x].price,
           clubKey:data[x].clubKey
         
         })
          
         }
          if(this.events===null)
          {
            this.hasAEvent=false
          }
  
       console.log(this.events,"the events")
 
      })
     })
   
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
