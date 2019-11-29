import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 import * as firebase from 'firebase';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

const firebaseConfig = {
  apiKey: "AIzaSyA-kTR7fRDa0qxM0hBMROLG8APChD8RTxY",
  authDomain: "internetcafe-8ab2b.firebaseapp.com",
  databaseURL: "https://internetcafe-8ab2b.firebaseio.com",
  projectId: "internetcafe-8ab2b",
  storageBucket: "internetcafe-8ab2b.appspot.com",
  messagingSenderId: "194688123148",
  appId: "1:194688123148:web:0329ce7412e2b9ad2d4929"
}; 
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
