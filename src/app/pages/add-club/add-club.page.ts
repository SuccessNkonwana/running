import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RunningService } from 'src/app/services/running.service';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

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
  selectedFile = null;
  
  map: any;

  itemList;
  marker?: any;
  startPosition;

  uid: any;
  addresses: string[] = [];
  coodinateses: string[] = [];

  selectedAddress = null;
  selectedcoodinates = null;

  uploadPercent: number;
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
  
  club;
  Address;
  close;
  Hours;

  constructor(private fb: FormBuilder,private clubService:RunningService, public loadingController: LoadingController) 
  { 
     

    this.clubForm = fb.group({

      club: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Address: ['', Validators.required],
      pic: ['', Validators.required],
      Hours: ['', Validators.required],
      Close: ['', Validators.required],
     



    },
    );
  }

  addClub()
  {
       this.newName = this.clubForm.get('club').value
       this.newAddress = this.clubForm.get('Address').value
       this.newOpeningHours = this.clubForm.get('Hours').value   
       
       this.newClosingHours = this.clubForm.get('Close').value


    this.clubService.addClub(this.newName,this.newAddress,this.newOpeningHours,this.newClosingHours)
  }

  uploadClubPic(event){
    this.clubService.uploadClubPic(event)
    // this.presentLoading();
  }
  ngOnInit() {
    // if (this.UpdateForm == "true") {
     
    // }
  }
  ionViewDidEnter() {
    if (this.UpdateForm == "true") {
    
    }

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 4000
    });
    await loading.present();
    this.addClub()
    loading.dismiss()
  }
  

}
