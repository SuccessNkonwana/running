import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  user = {} as User;
  public eventForm: FormGroup;


  constructor(
    private fb: FormBuilder
  ) {

    
    this.eventForm = fb.group({

      newName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      newAddress: ['', Validators.required],
      newOpeningHours: ['', Validators.required],
      newClosingHours: ['', Validators.required],

    },
    );
   }

  ngOnInit() {
  }




}
