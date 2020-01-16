import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  objectA={
    name:'',
    email:'',
  price:'',
  type:'',
  key:''
  }
  users: any;
  defaultpic=true
  theUser=[];
  currentuser: string;
  private MUsers: AngularFirestoreDocument
  sub
  username: string;
  photoURL: string;
  uploadPercent: number;
  thegender: string;
  theKey;
  theEmail;
  email;
  nn:string="";
  tempUser:string="";

  private uid: string= null;

  constructor(
    private authService: AuthService,
    public afs:AngularFirestore,
    private altctrl: AlertController,
    public afAuth: AngularFireAuth,
    private router: Router,
    public runn: RunningService,
    public loadingController: LoadingController
  ) { 
    this.theUser=[]    
    this.getdata()

  }

  ngOnInit() {
    
  }
  


  uploadProfilePic(event){
    this.authService.uploadProfilePic(event).subscribe((data:number)=>{
      this.uploadPercent=data
     
      console.log(this.uploadPercent)
    })
    this.filepresentLoading();
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

         this.uid = data[0].userKey;
         
        this.theUser.push({ 
          userKey:  data[x].userKey,
          name:  data[x].name,
          age:  data[x].age,
          email:  data[x].email,
          gender:  data[x].gender,
          photoURL:data[x].photoURL}
          
          )
        }
        this.email=this.theUser[0].Email
      console.log(this.theUser,"the LAST ONE vele" )
           if(this.theUser[0].photoURL==null)
           {
              this.defaultpic=false;
            
           }
     })
    }
    )
  
  }
  async nameUpdate(user) {

    
    const alert = await this.altctrl.create({
      subHeader: 'Add/Edit Name',
      inputs: [
        {
          name: 'displayName',
          type: 'text',
          // value: this.theUser[0].displayName,
          placeholder: 'displayName'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (inputData) => {
            this.nn=inputData.displayName;

            // this.tempUser=this.theUser[0]
            console.log(this.nn+"ddfdddfdfdd",user)
            this.runn.updateName(this.uid,this.nn)
            this.presentLoading();


          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 4000
    });
    await loading.present();
    this.getdata()
    loading.dismiss()
  }
 
  async filepresentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 15000
    });
    await loading.present();
    this. getdata()
    loading.dismiss()
  }
}
