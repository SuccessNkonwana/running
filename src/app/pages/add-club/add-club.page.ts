import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RunningService } from 'src/app/services/running.service';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { MapboxService,Feature } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.page.html',
  styleUrls: ['./add-club.page.scss'],
})
export class AddClubPage implements OnInit {
 // map
 list:any;
 addresses:string[]=[];
 selectedAddress=null;
 coordinates;
 lat;
 lng;
 userZ : any;

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
  // addresses: string[] = [];
  coodinateses: string[] = [];

  // selectedAddress = null;
  selectedcoodinates = null;

  uploadPercent: number;
  downloadU: any;
  uniqkey: any;



  urlPath = '';
  // list: any;

  // lng;
  // lat;

  newName;
  newAddress;
  newOpeningHours;
  newClosingHours;

  photoURL: string;
  
  club;
  Address;
  close;
  Hours;

  constructor(private mapboxService:MapboxService,private fb: FormBuilder,private clubService:RunningService, public loadingController: LoadingController) 
  { 
     

    this.clubForm = fb.group({

      club: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      Address: ['', Validators.required],
      // pic: ['', Validators.required],
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
  
  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }
  
  
  onSelect(address:string,i){
    this.selectedAddress=address;
     //  selectedcoodinates=
     console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
     console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
     this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
     this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
    //  this.userZ.coords = [this.lng,this.lat];
     console.log("index =" + i)
  
     console.log(this.selectedAddress)
     this.userZ= this.selectedAddress;
     console.log(this.userZ)
    //  this.addresses = [];
    this.addresses=[];
  }
}
