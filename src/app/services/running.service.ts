import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class RunningService {
  database = firebase.database();
  dbfire=firebase.firestore();
  
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

  constructor()
  { 

  }

  //add a club
  addClub(newName,newAddress,newOpeningHours,newClosingHours)
  {
    this.dbfire.collection("clubs").add({
      name: newName,
      address: newAddress,
      openingHours: newOpeningHours,
      closingHours: newClosingHours,
      
    }).then((data)=>{
    
    
     
      console.log(data)
    }).catch((error)=>{

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
///////get todos
getTodos()
{
 this.clubs=[]
 this.clubsTemp=[]
  let ans=[]
  let ans2=[]
   user=this.readCurrentSession()
  let userID=user.uid

  //
return new Promise((resolve, reject) => {
this.dbfire.collection("todos").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    
    // ans.push(doc.data())
     console.log(doc.id, '=>', doc.data());
     this.clubsTemp.push({
       todoKey: doc.id,
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
   resolve(this.clubs)
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


}
