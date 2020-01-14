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
  price:number=20;
 
 // adding tickets
 tickets:number=0;
 total:number;


  constructor(public navCtrl:NavController,private clubService:RunningService, public route:Router) { }

  ngOnInit() {
    
  }


back(){
  this.route.navigate(['/events'])
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
book(tickets,totalPrice,myevents){
  tickets=this.tickets;
  totalPrice=this.total;
  
  
  }
}
