import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, finalize } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { eventNames } from 'cluster';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class RunningService {
  database = firebase.database();
  dbfire=firebase.firestore();
  userProfile = []
  currentState : boolean 
  currentUser
  currClub=[]
  theCurrentClub
  currentSessionId 
  user
  clubs=[]
  clubsTemp=[]
  usersTemp=[]
  events=[]
 eventsTemp=[]
  users=[]
  myclubs=[]
  //INI values
  newName: string="";
  newAddress: string="";
  newOpeningHours: string="";
  newClosingHours: string="";
  newID: string="";
   fileRef
  editName: string="";
  editAddress: string="";
  editOpeningHours: string="";
  editClosingHours: string="";
  downloadU: any;
  uniqkey: string;
  dateTime: string;
  uploadPercent: any;
  task: any;
  file: any;
  clubID:String
  clubKey:String
 name:String 
openingHours:String
closingHours:String
userID:String
   photoURL:String
  ///

  currentBook=[];
  private itemDoc: AngularFirestoreDocument<Item>;
  eventKey: string;
  address: string;
  price: string;
  constructor(public auths:AuthService,private storage:AngularFireStorage,private afs: AngularFirestore, public navCtrl:NavController, public route:Router)
  { 
  }
  currentClub(myclubs)
  {
  //  console.log(myclubs[0].myclubs.myclubs[0].myclubs.clubKey,"the current Choosen club ID");
    this.currClub=[]
   
 
   this.currClub.push({
    myclubs
   })
   console.log(this.currClub,"the current club");
   console.log(this.currClub[0].myclubs.myclubs[0].myclubs.clubKey,"the current Choosen club ID");
  }
 rtClubName()
 {
  
   return this.currClub
 }
  async rtClubs()
  {
    let result :any
   await this.getClubs().then(data =>{
    result = data
  
   console.log(result.length);
  })
  console.log(result);
  //this.LandMarks()
  return  result 
  
  // console.log(this.todos,"hh")
   // return this.todos
  }
  async rtEvents()
  {
    let result :any
   await this.getEvents().then(data =>{
    result = data
  
   console.log(result.length);
  })
  console.log(result);
  //this.LandMarks()
  return  result 
  
  // console.log(this.todos,"hh")
   // return this.todos
  }
  async rtClubEvents()
  {
    let result :any
   await this.getAClubsEvents(this.myclubs).then(data =>{
    result = data
  
   console.log(result.length);
  })
  console.log(result);
  //this.LandMarks()
  return  result 
  
  // console.log(this.todos,"hh")
   // return this.todos
  }
  //return individuals clubs
  async rtMyClubs()
  {
    let result :any
   await this.getIndividualsClubs().then(data =>{
    result = data
  
   console.log(result.length);
  })
  console.log(result);
  //this.LandMarks()
  return  result 
  
  // console.log(this.todos,"hh")
   // return this.todos
  }
  async rtUsers()
  {
    let result :any
   await this.getUser().then(data =>{
    result = data
  
   console.log(result.length);
  })
  console.log(result);
  //this.LandMarks()
  return  result 
  
  // console.log(this.todos,"hh")
   // return this.todos
  }
  //add a club
  addClub(newName,newAddress,newOpeningHours,newClosingHours)
  {
   
    var styt=newOpeningHours.substring(11,16);
    var etyt=newClosingHours.substring(11,16);
    let user=this.readCurrentSession()
    let userID=user.uid
    console.log("HOT ",userID)

     this.uniqkey = newName+'Logo';
  const filePath = this.uniqkey;
  this.fileRef = this.storage.ref(filePath);
  this.task = this.storage.upload(filePath, this.file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadU = this.fileRef.getDownloadURL().subscribe(urlPath => {
          console.log(urlPath);
    this.dbfire.collection("clubs").add({
      name: newName,
      address: newAddress,
      openingHours: styt,
      closingHours: etyt,
      userID:userID,
      photoURL:urlPath
      
    }).then((data)=>{
    
    
     
      console.log(data)
    }).catch((error)=>{
      console.log(error)
    })
    
    this.uploadPercent = null;
  });
})
).subscribe();
return this.uploadPercent = this.task.percentageChanges();
   this.file=null;

  }
  ///update a club
updateTodo(clubs,editName,editAddress,editOpeningHours,editClosingHours)
{
 
//name
  this.dbfire.collection("clubs").doc(clubs.clubKey).update('name',editName).then((data)=> {
   
    console.log("Document name successfully updated!",data);
}).catch(function(error) {
    console.error("Error updating document: ", error);
});
//address
this.dbfire.collection("clubs").doc(clubs.clubKey).update('address',editAddress).then((data)=> {
  
  console.log("Document time successfully updated!",data);
}).catch(function(error) {
  console.error("Error updating document: ", error);
});
//opening hours
this.dbfire.collection("clubs").doc(clubs.clubKey).update('address',editOpeningHours).then((data)=> {
  
  console.log("Document time successfully updated!",data);
}).catch(function(error) {
  console.error("Error updating document: ", error);
});
//closing hours
this.dbfire.collection("clubs").doc(clubs.clubKey).update('address',editClosingHours).then((data)=> {
  
  console.log("Document time successfully updated!",data);
}).catch(function(error) {
  console.error("Error updating document: ", error);
});
}
//retrieve a club
async rtTodo()
{
  let result :any
 await this.getClubs().then(data =>{
  result = data
​
 console.log(result.length);
})
console.log(result);
//this.LandMarks()
return  result 
// console.log(this.todos,"hh")
 // return this.todos
}
///////get todos
getClubs()
{
 this.clubs=[]
 this.clubsTemp=[]
  let ans=[]
  let ans2=[]
  let user=this.readCurrentSession()
  let userID=user.uid
  //
return new Promise((resolve, reject) => {
this.dbfire.collection("clubs").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    
    // ans.push(doc.data())
     console.log(doc.id, '=>', doc.data());
     this.clubsTemp.push({
       clubKey: doc.id,
       name: doc.data().name,
       time: doc.data().time,
       userID: doc.data().userID,
       photoURL: doc.data().photoURL
     })
       console.log( this.clubsTemp,"club array")
       console.log(name,"club array")
   
       console.log( this.clubsTemp.length,"club array SIZE")
   //  this.todoTemp.push()
     
   });
   console.log( this.clubsTemp.length,"club array SIZE")
   for(let x=0;x< this.clubsTemp.length;x++)
   {
    console.log( this.clubsTemp[x].clubKey,"userid at x")

        if(this.clubsTemp[x].clubKey===userID)
        {
          this.clubs.push(this.clubsTemp[x])

        }

   }
   resolve(this.clubsTemp)
   console.log(this.clubsTemp,"clubs array")
console.log(ans,"ans array")
});
});

 
}
///////get todos
getEvents()
{
 this.events=[]
 this.eventsTemp=[]
  let ans=[]
  let ans2=[]
  let user=this.readCurrentSession()
  let userID=user.uid
  //
  return new Promise((resolve, reject) => {
    this.dbfire.collection("events").get().then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
        
        // ans.push(doc.data())
         console.log(doc.id, '=>', doc.data());
         this.eventsTemp.push({
           eventKey: doc.id,
           name: doc.data().name,
           address: doc.data().address,
           openingHours: doc.data().openingHours,
           closingHours: doc.data().closingHours,
           price: doc.data().newPrice,
           userID:doc.data().userID,
           clubKey: doc.data().clubID
    
         })
           console.log( this.eventsTemp,"events array")
           console.log(name,"event array")
       
           console.log( this.eventsTemp.length,"events array SIZE")
       //  this.todoTemp.push()
         
       });
       console.log( this.eventsTemp.length,"events array SIZE")
   
   resolve(this.eventsTemp)
   console.log(this.eventsTemp,"events array")
console.log(ans,"ans array")
});
});

 
}
///get a individuals club
getIndividualsClubs()
{
 this.clubs=[]
 this.clubsTemp=[]
  let ans=[]
  let ans2=[]
  let user=this.readCurrentSession()
  let userID=user.uid
  //
 

return new Promise((resolve, reject) => {
this.dbfire.collection("clubs").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    
    // ans.push(doc.data())
     console.log(doc.id, '=>', doc.data());
     this.clubsTemp.push({
       clubKey: doc.id,
       name: doc.data().name,
      openingHours: doc.data().openingHours,
      closingHours: doc.data().closingHours,
       userID: doc.data().userID,
       photoURL: doc.data().photoURL
     })
       console.log( this.clubsTemp,"club array")
       console.log(name,"club array")
   
       console.log( this.clubsTemp.length,"club array SIZE")
   //  this.todoTemp.push()
     
   });
   console.log( this.clubsTemp.length,"club array SIZE")
   for(let x=0;x< this.clubsTemp.length;x++)
   {
    console.log( this.clubsTemp[x].userID,"CLUB userid ")

        if(this.clubsTemp[x].userID===userID)
        {
          this.clubs.push(this.clubsTemp[x])

        }

   }
   resolve(this.clubs)
   console.log(this.clubs,"my clubs array")
console.log(ans,"ans array")
});
});

 
}

////single clubs events
getAClubsEvents(myclubs)
{
 
 this.events=[]
 this.eventsTemp=[]
  let ans=[]
  let ans2=[]
  this.currClub=[]

  

    
   //push current club
   this.currClub.push({myclubs})
  // this.currentClub(this.currClub)
  console.log(this.currClub,"the current club");
  
  // let user=this.readCurrentSession()
  // let userID=user.uid
let clubKey=myclubs.clubKey
console.log(clubKey," ClubID vele")
  //
  return new Promise((resolve, reject) => {
this.dbfire.collection("events").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    
    // ans.push(doc.data())
     console.log(doc.id, '=>', doc.data());
     this.eventsTemp.push({
       eventKey: doc.id,
       name: doc.data().name,
       address: doc.data().address,
       openingHours: doc.data().openingHours,
       closingHours: doc.data().closingHours,
       userID:doc.data().userID,
       clubKey: doc.data().clubID

     })
       console.log( this.eventsTemp,"events array")
       console.log(name,"event array")
   
       console.log( this.eventsTemp.length,"events array SIZE")
   //  this.todoTemp.push()
     
   });
   console.log( this.eventsTemp.length,"events array SIZE")
   for(let x=0;x< this.eventsTemp.length;x++)
   {
    console.log( this.eventsTemp[x].clubKey,"CLUB id at x ")

        if(this.eventsTemp[x].clubKey===clubKey)
        {
          this.events.push(this.eventsTemp[x])

        }

   }
   console.log(this.events,"my events array")
console.log(ans,"ans array")
   resolve(this.events)
});
});

 
}
////upload a club pic
uploadClubPic(event) {
  let user=this.readCurrentSession()
let userID=user['uid']
console.log("the user",userID);
this.file = event.target.files[0];
  console.log(this.file)
 
  // observe percentage changes
  
       
       
  //////////////////////
}

///////delete todo
deleteTodo(clubs)
{
 this.dbfire.collection("todos").doc(clubs.todoKey).delete().then((data)=> {
   console.log("Document successfully deleted!",data);
   
}).catch(function(error) {
   console.error("Error removing document: ", error);
});
}
//
who()
{
  this.user=this.auths.who()
  this.setCurrentSession(this.user)
  console.log("logged in user ",this.user)
}
 ///set user session start
 setCurrentSession(user){
  console.log("running now", user.currentUser.uid);
  var uid
  if (user !== null){
    uid = user.currentUser.uid;
    this.user = user.currentUser
    console.log(uid);
    
    var userRoot = firebase.database().ref("Users").child(uid)
    userRoot.once("value", snap => {
      //console.log(userRoot);
      let values = snap.val()
        console.log(values["name"]);
        console.log(values["email"]);
        this.userProfile.push({
        key: snap.key,
        displayName : values["name"],
        email : values["email"],
        })
    })  
  }
   this.currentSessionId = uid
   console.log(uid);
   console.log("last in set ",user);
   console.log("last in set 2",this.user);  
}
 ///set user session end
 destroyUserData(){
  this.userProfile.pop()
  console.log(this.userProfile);
  
}
readCurrentSession(){
  this.who()
  console.log(this.user);
  return this.user
}
returnUserProfile(){
  console.log(this.userProfile);
  return this.userProfile
}
 
///create event 
addEvent(newName,newAddress,newOpeningHours,newClosingHours,newPrice)
  {
  
  console.log(newOpeningHours,newClosingHours,"times as strings");
  
    let styt=newOpeningHours.substring(11,16);
    let etyt=newClosingHours.substring(11,16);

    let user=this.readCurrentSession()
    let userID=user.uid
    let clubKey=this.currClub[0].myclubs.myclubs[0].myclubs.clubKey
    console.log(this.currClub[0].myclubs.myclubs[0].myclubs.clubKey," addevnt page club");
    
    console.log("HOT ",this.currClub[0].myclubs.myclubs[0].myclubs.clubKey)
    this.uniqkey = newName+'Logo';
    const filePath = this.uniqkey;
    this.fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, this.file);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadU = this.fileRef.getDownloadURL().subscribe(urlPath => {
            console.log(urlPath);
   
    this.dbfire.collection("events").add({
      name: newName,
      address: newAddress,
      openingHours: styt,
      closingHours: etyt,
      userID:userID,
     clubID: clubKey,
     newPrice:newPrice,
     photoURL:urlPath
      
    }).then((data)=>{
    
    
     
      console.log(data)
    }).catch((error)=>{
      console.log(error)
    })
    this.uploadPercent = null;
  });
})
).subscribe();
return this.uploadPercent = this.task.percentageChanges();
   this.file=null;


  }
  updateUser(){
    let user=this.readCurrentSession()
    let userID=user.uid
    
  }
  getUser(){
    this.users=[]
    this.usersTemp=[]
     let ans=[]
     let ans2=[]

    let user=this.readCurrentSession()
    let userID=user.uid
   console.log(userID)
    return new Promise((resolve, reject) => {
      this.dbfire.collection("users").get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
          
          // ans.push(doc.data())
           console.log(doc.id, '=>', doc.data());
           this.usersTemp.push({
            userKey: doc.id,
             name: doc.data().displayName,
             age: doc.data().Age,
             email: doc.data().Email,
             gender: doc.data().gender,
             photoURL: doc.data().photoURL
           })
             console.log( this.usersTemp,"users array")
             console.log(name,"users array")
         
             console.log( this.usersTemp.length,"users array SIZE")
         //  this.todoTemp.push()
           
         });
         console.log( this.usersTemp.length,"users array SIZE")
        
         for(let x=0;x< this.usersTemp.length;x++)
         {
         
      
              if(this.usersTemp[x].userKey===userID)
              {
                console.log( this.usersTemp[x].userKey,"userid at x")
                this.users.push(this.usersTemp[x])
      
              }
      
         }
         resolve(this.users)
      });
      });
      console.log(this.usersTemp,"clubs array")
     console.log(ans,"ans array")
       
      }
  
///retrieve event
///update event
///delete event
async rtBooking()
{
    //method two
    let result :any
   await this.booking(this.currentBook).then(data =>{
    result = data
  
   console.log(result.length);
  })
  console.log(result);
  return  result 
}
// booking the event
 BookEvent(tickets,total)
  {
    console.log(tickets,total,"=================");
    
    ///method three
    return new Promise((resolve, reject) => {
      this.booking(this.currentBook).then(data =>{
     
        console.log(data[0].myevents,"the selected one vele",data[0].myevents.eventKey);
        
      this.dbfire.collection("bookedEvents").add({
      eventKey: this.currentBook[0].eventKey,
      name: data[0].myevents.name,
      address: data[0].myevents.address,
       openingHours: data[0].myevents.openingHours,
       closingHours: data[0].myevents.clossingHours,
       userID:data[0].myevents.userID,
       clubID: data[0].myevents.clubID,
       price: data[0].myevents.price,
       tickets:tickets,
       total:total
      
    }).then((data)=>{
    
    
     
      console.log(data)
   
    
    }).catch((error)=>{
      console.log(error)
    })

     })
    })
  //   console.log( "somethinf"+event)
  

  }
  // paying for the event
  payment(eventName,eventAddress,eventPrice,tickets,totalPrice)
  {
   
    
    let user=this.readCurrentSession()
    let userID=user.uid
    // let clubID= this.currClub[0].clubKey
    // console.log("HOT ",clubID)

   
    this.dbfire.collection("bookedEvents").add({
      event: eventName,
      address: eventAddress,
      userID:userID,
      // clubID: clubID,
      price:eventPrice,
      tickets:tickets,
      total:totalPrice
      
    }).then((data)=>{
    
    
     
      console.log(data)
      //  this.route.navigate(['/edit'],{queryParams:{name: item.name,price:item.price,type:item.type,key:item.key}})

      // this.navCtrl.navigateRoot("/done");
    }).catch((error)=>{
      console.log(error)
    })
  

  }
  update(objectA,key){

    this.itemDoc = this.afs.doc<Item>('users/'+key);
    this.itemDoc.update(objectA);
  }
  delete(key){
  
    this.itemDoc = this.afs.doc<Item>('users/'+key);
    // this.itemDoc.update(objectA);
    this.itemDoc.delete();
   
  }
  booking(myevents){
   this.currentBook=[]
    return new Promise((resolve, reject) => {
      
    this.currentBook.push(

      {
       myevents

      }
     
    )
    
    console.log(myevents);
    console.log(this.currentBook);

    resolve(this.currentBook)
  });
  }
  uploadEventPic(event){
    let user=this.readCurrentSession()
    let userID=user['uid']
    console.log("the user",userID);
    this.file = event.target.files[0];
      console.log(this.file)
  }


  updateName(userID,editName)
{
 
  this.dbfire.collection("users").doc(userID).update({displayName: editName}).then((data)=> {
   
    console.log("Document name successfully updated!",data);
}).catch(function(error) {
    console.error("Error updating document: ", error);
});
}

}

