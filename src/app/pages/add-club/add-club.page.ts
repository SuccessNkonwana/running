import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RunningService } from 'src/app/services/running.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.page.html',
  styleUrls: ['./add-club.page.scss'],
})
export class AddClubPage implements OnInit {
  user = {} as User;
  public clubForm: FormGroup;
  RegisterForm: string = "true";
  UpdateForm: string = "false";

  map: any;

  itemList;
  marker?: any;
  startPosition;

  uid: any;
  addresses: string[] = [];
  coodinateses: string[] = [];

  selectedAddress = null;
  selectedcoodinates = null;

  uploadPercent: Observable<number>;
  downloadU: any;
  uniqkey: any;



  urlPath = '';
  list: any;

  lng;
  lat;

  newName;
  newAddress;
  newOpeningHours;
  newClosingHours;

  photoURL: string;
  
  constructor(private fb: FormBuilder,private clubService:RunningService) 
  { 
     

    this.clubForm = fb.group({

      club: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Address: ['', Validators.required],
      Hours: ['', Validators.required],
      Close: ['', Validators.required],



    },
    );
  }


  addClub(newName,newAddress,newOpeningHours,newClosingHours)
  {
    this.newName = this.clubForm.get('club').value
    this.newAddress = this.clubForm.get('Address').value
    this.newOpeningHours = this.clubForm.get('Hours').value   
    this.newClosingHours = this.clubForm.get('Close').value

    this.clubService.addClub(this.newName,this.newAddress,this.newOpeningHours,this.newClosingHours)
  }
  ngOnInit() {
    if (this.UpdateForm == "true") {
     
    }
  }
  ionViewDidEnter() {
    if (this.UpdateForm == "true") {
    
    }

  }




}
