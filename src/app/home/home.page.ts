import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RunningService } from '../services/running.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  clubs= [];
  theUser=[];
  defaultpic=true;
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
  constructor(private  router:  Router,public runn: RunningService)
  {
    
    this.clubs=[]  
    this.theUser=[]     
    this.getdata()
    this.getUser()
  }
  getdata()
  {
    return new Promise((resolve, reject) => {
      this.runn.rtClubs().then(data =>{
     
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

     })
    })
  
  }

  getUser()
  {
    return new Promise((resolve, reject) => {
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
  // gotoEvents(){
  //   this.router.navigateByUrl("events")
  // }
  // gotoAdd(){
  //   this.router.navigateByUrl("add")
  // }
//  getClubs()
//   {
     
//    this.runn.getClubs();
//   }

}
