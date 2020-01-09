import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  user = {} as User;
  public eventForm: FormGroup;

  club;
  newName;
  newAddress;
  newOpeningHours;
  newClosingHours;

  constructor(
    private fb: FormBuilder,private eventService:RunningService
  ) {

    
    this.eventForm = fb.group({

      event: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Address: ['', Validators.required],
      Hours: ['', Validators.required],
      Close: ['', Validators.required],

    },
    );
   }

  
   addEvent(club,newName,newAddress,newOpeningHours,newClosingHours)
  {
       this.newName = this.eventForm.get('event').value
       this.newAddress = this.eventForm.get('Address').value
       this.newOpeningHours = this.eventForm.get('Hours').value   
       this.newClosingHours = this.eventForm.get('Close').value


    this.eventService.addEvent(this.club,this.newName,this.newAddress,this.newOpeningHours,this.newClosingHours)
  }

  ngOnInit() {
  }




}
