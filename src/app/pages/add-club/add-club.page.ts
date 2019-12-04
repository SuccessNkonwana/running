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
  
  photoURL: string;
  clubName: string;
  Address: string;
  Hours: string;
  Close: string;
  constructor( 
    private fb: FormBuilder,
    private clubService:RunningService
  ) { 


    this.clubForm = fb.group({

      club: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Address: ['', Validators.required],
      Hours: ['', Validators.required],
      Close: ['', Validators.required],

    },
    );
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
