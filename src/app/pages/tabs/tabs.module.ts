import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

// import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children:[
//         { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
//         { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
//         { path: 'events', loadChildren: '../events/events.module#EventsPageModule' },
//         { path: 'add', loadChildren: '../add/add.module#AddPageModule' },
       
//     ]
//   },
//   {
//     path:'',
//     redirectTo:'/tabs/home',
//     pathMatch:'full'
//   }
// ];
const routes: Routes = [
  {
    path: '',
    component: TabsPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    // TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
