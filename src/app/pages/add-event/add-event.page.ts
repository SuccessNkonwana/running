import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RunningService } from 'src/app/services/running.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  users: any;
  defaultpic=true
  theUser=[];
  photoURL: string;
  uploadPercent: number;
  currentuser: string;
  

  clubs=[]
  newName
  newAddress
  newOpeningHours
  newClosingHours
  newPrice
  user = {} as User;
  
  public eventForm: FormGroup;


  constructor(
    private fb: FormBuilder,public runn: RunningService, private authService: AuthService,) {

    
    this.eventForm = fb.group({

      newName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      newAddress: ['', Validators.required],
      newOpeningHours: ['', Validators.required],
      newClosingHours: ['', Validators.required],
      newPrice: ['', Validators.required],

    },
    );

   this.clubs=[]

   this.theUser=[]    
    this.getdata()
   }

  ngOnInit() {
  }
addEvent(newName,newAddress,newOpeningHours,newClosingHours,newPrice)
{

      this.runn.addEvent(this.newName,this.newAddress,this.newOpeningHours,this.newClosingHours,this.newPrice)
}

uploadProfilePic(event){
  this.authService.uploadProfilePic(event).subscribe((data:number)=>{
    this.uploadPercent=data
    console.log(this.uploadPercent)
  })
}
pickImage(){
  this.authService.pickImage();
}
getdata()
{
  return new Promise((resolve, reject) => {
    this.runn.rtUsers().then(data =>{
   
      console.log( data.length);
      for( let x = 0; x < data.length; x++ )
      {
       console.log(x);
       
      this.theUser.push({ 
        userKey:  data[x].userKey,
        // name:  data[x].name,
        // age:  data[x].age,
        // email:  data[x].email,
        // gender:  data[x].gender,
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



}
