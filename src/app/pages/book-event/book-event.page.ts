import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RunningService } from 'src/app/services/running.service';
import { ActivatedRoute, Router } from '@angular/router';
import { eventNames } from 'cluster';

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
  price:number=20;
 
 // adding tickets
 tickets:number=0;
 total:number;


  constructor(public navCtrl:NavController,private clubService:RunningService, public route:Router) { }

  ngOnInit() {
    
  }



  add(num:number) {
    this.tickets=this.tickets+num;
    this.total=this.price*this.tickets;
}
// subtructing tickets
sub(num:number) {

  this.tickets=this.tickets-num;
  if(this.tickets<0){
    this.tickets=0;
}
this.total=this.price*this.tickets;
}
book(eventName,eventAddress,eventOpeningHours,eventClosingHours,eventPrice,tickets,totalPrice){
  eventName="first event";
  eventAddress="home";
  eventOpeningHours="11:00";
  eventClosingHours="17:00";
  eventPrice=this.price;
  tickets=this.tickets;
  totalPrice=this.total;
  
  // this.navCtrl.navigateRoot("/payments");
   this.clubService.BookEvent(eventName,eventAddress,eventOpeningHours,eventClosingHours,eventPrice,tickets,totalPrice)
   this.route.navigate(['/done'],{queryParams:{name:eventName}})
   console.log("the event name is:  "+eventName)
  }
}
