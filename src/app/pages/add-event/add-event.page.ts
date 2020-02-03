import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RunningService } from 'src/app/services/running.service';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService,Feature } from 'src/app/services/mapbox.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
  providers:[DatePipe]
})
export class AddEventPage implements OnInit {

  users: any;
  defaultpic=true
  theUser=[];
  photoURL: string;
  uploadPercent: number;
  currentuser: string;
  list:any;
  addresses:string[]=[];
  selectedAddress=null;
  coordinates;
  lat;
  lng;
  userr : any;

  clubs=[]
  newName
  newAddress
  newOpeningHours
  newClosingHours
  newPrice
  newDate
  newDistance
  user = {} as User;
  // map
 
 
  userZ : any;
  public eventForm: FormGroup;
//adress
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
    //  this.user.coords = [this.lng,this.lat];
     console.log("index =" + i)
     console.log(this.selectedAddress)
     this.userr= this.selectedAddress;
     console.log(this.user)
      this.addresses = [];
    // this.addresses=[];
  }
  //address
  constructor(private datePipe:DatePipe,
    private fb: FormBuilder,public runn: RunningService, private authService: AuthService,private mapboxService:MapboxService,private loadingController:LoadingController) {

    
    this.eventForm = fb.group({

      newName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      newDistance: ['', Validators.compose([Validators.pattern('[0-9 ]*'), Validators.required])],
      newAddress: ['', Validators.required],
      newOpeningHours: ['', Validators.required],
      newClosingHours: ['', Validators.required],
      // pic: ['', Validators.required],
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
 this.newDate=this.datePipe.transform(this.newDate,"dd-MM-yyyy");
 console.log(this.newDate)
      this.runn.addEvent(this.newName,this.newAddress,this.newOpeningHours,this.newClosingHours,this.newPrice,this.newDistance,this.newDate)
this.presentLoading()
    }

uploadEventPic(event){
  this.runn.uploadEventPic(event)
}

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'loading...',
    duration: 4000
  });
  await loading.present();
  
  loading.dismiss()
}

}
