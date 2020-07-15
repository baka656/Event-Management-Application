import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IttopService } from './ittop.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  log:boolean=false;
  a:string="Ecficio 4.0";
  b:string="entrepreneurship@ecficio.com";
  public freshPages=[
    {
      title: 'Events',
      url: '/events',
      icon: 'color-wand'
    },
    {
      title: 'Online Registration',
      url: '/online-registration',
      icon: 'paper-plane'
    },
    {
      title: 'Get My QR',
      url: '/get-my-qr',
      icon: 'trash'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'warning'
    }
  ];
  public participantPages=[
    {
      title: 'Events',
      url: '/events',
      icon: 'color-wand'
    },
    {
      title: 'Online Registration',
      url: '/online-registration',
      icon: 'paper-plane'
    }
  ];
  public appPages=[];
  public organizerPages = [
    {
      title: 'Events',
      url: '/events',
      icon: 'color-wand'
    },
    {
      title: 'Online Registration',
      url: '/online-registration',
      icon: 'paper-plane'
    },
    {
      title: 'Offline Registration',
      url: '/offline-registration',
      icon: 'heart'
    },
    {
      title: 'Organizer',
      url: 'organizer',
      icon: 'archive'
    },
    {
      title: 'Get My QR',
      url: '/get-my-qr',
      icon: 'trash'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private us:IttopService,private platform: Platform,private splashScreen: SplashScreen,
    private statusBar: StatusBar,private router:Router) 
  {    
    this.initializeApp();
  }

  initializeApp() {
    this.us.getObject('logSession').then((res)=>{
      if(res==undefined){
        this.log=false;
        this.appPages=this.freshPages;
      }
      else if(res['user']=='participant'){
        this.log=true;
        this.appPages=this.participantPages;
        this.a=res['name'];
        this.b="receipt id-"+res['receipt'];
      }
      else if(res['user']=='organizer'){
        this.log=true;
        this.appPages=this.organizerPages;
        this.a="Organizer";
        this.b="organizer@ecficio.com";
      }
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.log=false;
    this.us.removeItem('logSession');
    this.initializeApp();
    this.a="Ecficio 4.0";
    this.b="entrepreneurship@ecficio.com";
    this.router.navigate(['events']);
  }

  ngOnInit() {
    this.initializeApp();
  }
}
