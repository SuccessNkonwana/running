import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
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
  constructor(
    private authService: AuthService,
    public afs:AngularFirestore,
    private altctrl: AlertController,
    public afAuth: AngularFireAuth,
    private router: Router,
    public runn: RunningService
  ) { 
    this.theUser=[]    
    this.getdata()

    // this.users=this.afs.collection('users',ref =>ref.orderBy('displayName')).valueChanges();
    // this.currentuser=this.authService.getUID();
    // console.log("current user=>>"+this.currentuser)
    // this.MUsers=afs.doc('users/${authService.getUID()}')
    // this.sub= this.MUsers.valueChanges().subscribe(event=>{
    //   this.username=event.displayName
    //   this.photoURL=event.photoURL
    //   console.log("the user name"+ this.username)
    // })
  }

  ngOnInit() {
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
          name:  data[x].name,
          age:  data[x].age,
          email:  data[x].email,
          gender:  data[x].gender,
          photoURL:data[x].photoURL}
          
          )
        }
      console.log(this.theUser,"the LAST ONE vele" )
           if(this.theUser[0].photoURL==null)
           {
              this.defaultpic=false;
            
           }
     })
    }
    )
  
  }
  async EmailUpdate(user) {

    
    const alert = await this.altctrl.create({
      subHeader: 'Add/Edit Name',
      inputs: [
        {
          name: 'Email address',
          type: 'text',
          value: user.Email,
          placeholder: 'Email address'
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
            // console.log(inputData.name1)
            this.runn.update(this.objectA,this.objectA.key)
          
     console.log("email updated")
            

          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();

  }
 
}
