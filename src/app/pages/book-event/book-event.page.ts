import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RunningService } from 'src/app/services/running.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { eventNames } from 'cluster';

@Component({
  selector: 'app-book-event',
  templateUrl: './book-event.page.html',
  styleUrls: ['./book-event.page.scss'],
})
export class BookEventPage implements OnInit {
  eventName;
  eventAddress;
  eventOpeningHours;
  eventClosingHours;
  // eventPrice;
  // tickets;
  // totalPrice;


  // ticket price
 
 
 // adding tickets
 tickets:number=0;
 total:number;
  hasAEvent=true;
events=[];

  constructor(public navCtrl:NavController,private clubService:RunningService, public route:Router) {
    this.events= []; 
   }

  ngOnInit() {
    this.bookE();
  }
  bookE()
  {

  return new Promise((resolve, reject) => {
      this.clubService.rtEvents().then(data =>{
     
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
     //  this.route.navigate(['/book-event'],{queryParams:{name:this.events.eventk}})

     })
    })
  
  }

back(){
  this.route.navigate(['/events'])
}
  add(num:number) {
    this.tickets=this.tickets+num;
    // this.total=this.price*this.tickets;
}
// subtructing tickets
sub(num:number) {

  this.tickets=this.tickets-num;
  if(this.tickets<0){
    this.tickets=0;
}
// this.total=this.price*this.tickets;
}
book(tickets,totalPrice,myevents){
  tickets=this.tickets;
  totalPrice=this.total;
  
  
  }
}
