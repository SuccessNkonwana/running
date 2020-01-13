import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-book-event',
  templateUrl: './book-event.page.html',
  styleUrls: ['./book-event.page.scss'],
})
export class BookEventPage implements OnInit {
  // ticket price
  price:number=1;
 
 // adding tickets
 tickets:number=0;
 total:number;
  constructor(public navCtrl:NavController) { }

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
book(){
  this.navCtrl.navigateRoot("/payments");
}
}
