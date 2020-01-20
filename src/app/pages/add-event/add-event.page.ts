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
  newDate
  newDistance
  user = {} as User;
  
  public eventForm: FormGroup;


  constructor(
    private fb: FormBuilder,public runn: RunningService, private authService: AuthService,) {

    
    this.eventForm = fb.group({

      newName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      newDistance: ['', Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
      newAddress: ['', Validators.required],
      newOpeningHours: ['', Validators.required],
      newClosingHours: ['', Validators.required],
      newDate: ['', Validators.required],
      newPrice: ['',Validators.compose([Validators.pattern('[0-9 ]{2,4}$'), Validators.required])],

    },
    );

   this.clubs=[]

   this.theUser=[]    
 
   }

  ngOnInit() {
  }
addEvent()
{

      this.runn.addEvent(this.newName,this.newAddress,this.newOpeningHours,this.newClosingHours,this.newPrice,this.newDistance,this.newDate)
}

uploadEventPic(event){
  this.runn.uploadEventPic(event)
}



}
