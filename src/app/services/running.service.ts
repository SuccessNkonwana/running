import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RunningService {
  database = firebase.database();
  dbfire=firebase.firestore();
  userProfile = []
  currentState : boolean 
  currentUser
  currentSessionId 
  user
  clubs=[]
  clubsTemp=[]
  //INI values
  newName: string="";
  newAddress: string="";
  newOpeningHours: string="";
  newClosingHours: string="";
  editName: string="";
  editAddress: string="";
  editOpeningHours: string="";
  editClosingHours: string="";
  ///
  constructor(public auths:AuthService)
  { 
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
  //add a club
  addClub(newName,newAddress,newOpeningHours,newClosingHours)
  {
    var styt=newOpeningHours.substring(11,16);
    var etyt=newClosingHours.substring(11,16);
    let user=this.readCurrentSession()
    let userID=user.uid
    console.log("HOT ",userID)
    this.dbfire.collection("clubs").add({
      name: newName,
      address: newAddress,
      openingHours: styt,
      closingHours: etyt
      
    }).then((data)=>{
    
    
     
      console.log(data)
    }).catch((error)=>{
      console.log(error)
    })
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
       userID: doc.data().userID
     })
       console.log( this.clubsTemp,"club array")
       console.log(name,"club array")
   
       console.log( this.clubsTemp.length,"club array SIZE")
   //  this.todoTemp.push()
     
   });
   console.log( this.clubsTemp.length,"club array SIZE")
   for(let x=0;x< this.clubsTemp.length;x++)
   {
    console.log( this.clubsTemp[x].userID,"userid at x")
        if(this.clubsTemp[x].userID===userID)
        {
          this.clubs.push(this.clubsTemp[x])
        }
   }
   resolve(this.clubsTemp)
});
});
console.log(this.clubsTemp,"clubs array")
console.log(ans,"ans array")
 
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
///retrieve event
///update event
///delete event
}

