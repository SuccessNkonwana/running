import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RunningService } from '../services/running.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  clubs= [];
  tickets=[];
  theUser=[];
  hasATicket=false;
  hasAClub=false;
  defaultpic=true;
  isSlide: boolean = true;
  slides: any;
slideOpts = {
    slidesPerView: 1.1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
    }
    slideOptsT = {
      slidesPerView: 1.1,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }
      }
  constructor(private  router:  Router,public runn: RunningService,public loadingController: LoadingController,)
  {
    this.tickets=[]
    this.clubs=[]  
    this.theUser=[]     
    this.getdata()
    this.getUser()
    this.getTickets()
    this.presentLoading();
  }
  ngOnDestroy() {
    console.log('foo destroy')
  }
  ionViewDidEnter(){
    this.getdata()
  }
  ionViewDidLeave(){
    this.tickets=[]
    this.clubs=[]  
    this.theUser=[]  
    console.log("k");
     
  }
  ngOnInit() {
  //  this.getBooked();
  }
  getTickets()
  {
   
    return new Promise((resolve, reject) => {
      this.tickets=[]
      this.runn.rtTickets().then(data =>{
     
        console.log(data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.tickets.push({ 
         bookingID:data[x].bookingID,
         eventKey: data[x].eventKey,
          name: data[x].name,
          address: data[x].address,
          openingHours: data[x].openingHours,
          closingHours: data[x].closingHours,
          userID: data[x].userID,
          clubID: data[x].clubKey,
          price: data[x].price,
          date: data[x].date,
          tickets: data[x].tickets,
          total: data[x].total,
          approved: data[x].approved,
          deposited: data[x].deposited
    
        })
      console.log(this.tickets,"LAST ONE")

      }
    
      if(this.tickets.length!=0 && this.tickets!=null)
      {
        this.hasATicket=true;
      }
     })
     
    })
  
  }

  getdata()
  {
    this.clubs=[]  
    return new Promise((resolve, reject) => {
      this.clubs=[]  
      this.runn.rtClubs().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.clubs.push({ 
          clubKey:  data[x].clubKey,
          name:  data[x].name,
          openingHours:  data[x].openingHours,
          address:  data[x].address,
          closingHours:  data[x].closingHours,
          userID:  data[x].userID,
          photoURL:data[x].photoURL})
          
    
        }
      console.log(this.clubs,"LAST ONE")

      if(this.clubs.length!=0 && this.clubs!=null)
      {
        this.hasAClub=true;
      }
     })
    
    })
  
  }

  getUser()
  {
    
    return new Promise((resolve, reject) => {
      this.theUser=[] 
      this.runn.rtUsers().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.theUser.push({ 
          userKey:  data[x].userKey,
          name:  data[x].name,
          age:  data[x].age,
          email:  data[x].email,
          gender:  data[x].gender,
          photoURL:data[x].photoURL}
          
          )
          // userKey: doc.id,
          //    name: doc.data().displayName,
          //    age: doc.data().Age,
          //    Email: doc.data().Email,
          //    gender: doc.data().gender,
          //    photoURL: doc.data().photoURL
    
        }
      console.log(this.theUser,"the LAST ONE vele" )
           if(this.theUser[0].photoURL==null)
           {
              this.defaultpic=false;
            
           }
     })
    
    })
  
  }
  slideChanged()
   {
    this.slides.startAutoplay();
   }
  go()
  {
    this.router.navigateByUrl("book-event")
  }
  goHome()
  {
    this.router.navigateByUrl("home")
  }
  gotoProfile(){
    this.router.navigateByUrl("profile")
  }
  myEvents;closingHours;openingHours;address;date;name
getBooked(){
  this.runn.getBooked().subscribe(data=>{
    this.myEvents=data.map(e=>{
      return{
        key: e.payload.doc.id,
        closingHours: e.payload.doc.data()['closingHours'],
        openingHours: e.payload.doc.data()['openingHours'],
        address: e.payload.doc.data()['address'],
        name: e.payload.doc.data()['name'],
        date: e.payload.doc.data()['date'],
        approved: e.payload.doc.data()['approved'],

       
      }as Events;// the Item is the class name in the item.ts
    });
    console.log(this.myEvents);

    for(let r=0;r<this.myEvents.length;r++)
    {
      console.log(this.myEvents[r].approved,"&&&&&&");
     if(this.myEvents[r].approved===true) 
     {
      this.tickets.push({

        key: this.myEvents[r].key,
        closingHours: this.myEvents[r].closingHours,
        openingHours:this.myEvents[r].openingHours ,
        address: this.myEvents[r].address,
        name:this.myEvents[r].name ,
        date: this.myEvents[r].date,
        approved: this.myEvents[r].approved
      })
      
     }
     console.log(this.tickets);

    }
if(this.tickets.length===0 && this.tickets===null)
{

this.hasATicket=false
}

  });
}
async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'loading...',
    duration: 4000
  });
  await loading.present();

  loading.dismiss()
}
chooseClub(myclubs)
{

  this.runn.chooseClub(myclubs);
}

}
