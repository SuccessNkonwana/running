import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
  
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  {
    
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  

  { path: 'tabs', component: TabsPage, children:
  [
    { path: 'home', loadChildren: './home/home.module#HomePageModule'},
     { path: 'add', loadChildren: './pages/add/add.module#AddPageModule' },
    { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
    { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
  
  ] 
},


  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'club-home',
    loadChildren: () => import('./pages/club-home/club-home.module').then( m => m.ClubHomePageModule)
  },
 
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // },
  
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'add-club',
    loadChildren: () => import('./pages/add-club/add-club.module').then( m => m.AddClubPageModule)
  }, 
  {
    path: 'add-event',
    loadChildren: () => import('./pages/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'book-event',
    loadChildren: () => import('./pages/book-event/book-event.module').then( m => m.BookEventPageModule)
  },
  {
    path: 'schedule-event',
    loadChildren: () => import('./pages/schedule-event/schedule-event.module').then( m => m.ScheduleEventPageModule)
  },
  // {
  //   path: 'events',
  //   loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  // },
  // {
  //   path: 'add',
  //   loadChildren: () => import('./pages/add/add.module').then( m => m.AddPageModule)
  // },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  // }
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
