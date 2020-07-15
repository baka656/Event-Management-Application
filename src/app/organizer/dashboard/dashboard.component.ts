import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IttopService } from 'src/app/ittop.service';
import { Event } from 'models/events';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  event="";
  msg:string=""
  data:Event={} as Event;
  status:string="";
  qr1:boolean=false;
  qr2:boolean=false;
  constructor(private qr:BarcodeScanner,private lc:LoadingController,private toastCtrl:ToastController,
    private us:IttopService,private route:ActivatedRoute,private router:Router) { 
      
  }

  ngOnInit() {
    this.event=this.route.snapshot.paramMap.get('id');
    this.qr1=false;
    this.qr2=false;
  }

  getr1(receipt:string){
    this.data={} as Event;
    this.data.eventname=this.event;
    this.data.r1marks=-1;
    this.data.r2marks=-1;
    this.data.receipt=Number(receipt);
    this.data.timestamp=new Date();
    this.us.scanUser1(this.data).subscribe(baka=>{
      if(baka['message']=='success'){
        var p:Event[]=[];
        this.data.name=baka['data'];
        Storage.get({key: this.event+"1"}).then((val)=>{
          if(val.value!=null)
            p=JSON.parse(val.value);
          p.push(this.data);
          console.log(val.value,p);
          Storage.set({key: this.event+"1",value: JSON.stringify(p)});
        });
        alert("successfully registered for round1");
      }
      else if(baka['message']=='already registered'){
        alert("already registered");
      }
      else if(baka['message']=='not in participants'){
        alert("not a participant");
      }
    });
  }

  getr2(receipt:string){
    this.data={} as Event;
    this.data.eventname=this.event;
    this.data.r2marks=-1;
    this.data.receipt=Number(receipt);
    this.data.timestamp=new Date();
    console.log(this.data);
    this.us.scanUser2({eventname: this.data.eventname,receipt: this.data.receipt}).subscribe(baka=>{
      if(baka['message']=='success'){
        var p:Event[]=[];
        this.data.name=baka['data'];
        Storage.get({key: this.event+"2"}).then((val)=>{
          if(val.value!=null)
            p=JSON.parse(val.value);
          p.push(this.data);
          console.log("success",p);
          Storage.set({key: this.event+"2",value: JSON.stringify(p)});
        });
        alert("successfully registered for round2");
      }
      else if(baka['message']=='already registered'){
        alert("already registered");
      }
      else if(baka['message']=='not participated in round1'){
        alert("not participated in round1");
      }
    });
  }

  Scancoder1(){
    this.data={} as Event;
    this.data.eventname=this.event;
    this.qr.scan().then((data) => {
      this.qr1=true;
      let s=data.text.split(" "); 
      this.data.r1marks=-1;
      this.data.r2marks=-1;
      this.data.receipt=Number(s[0]);
      this.data.name=s[1];
      this.data.college=s[2];
      this.data.phone=Number(s[3]);
      this.data.rollno=s[4];
      this.data.email=s[5];  
      this.data.timestamp=new Date();
      console.log(this.data);
      this.us.scanUser1(this.data).subscribe(baka=>{
        if(baka['message']=='success'){
          var p:Event[]=[];
          Storage.get({key: this.event+"1"}).then((val)=>{
            if(val.value!=null)
              p=JSON.parse(val.value);
            p.push(this.data);
            console.log("success",p);
            Storage.set({key: this.event+"1",value: JSON.stringify(p)});
          });
          alert("successfully registered for round1");
        }
        else if(baka['message']=='already registered'){
          alert("already registered");
        }
        else if(baka['message']=='not in participants'){
          alert("not a participant");
        }
      });
    });
  }

  Scancoder2(){
    this.data={} as Event;
    this.data.eventname=this.event;
    this.qr.scan().then((data) => {
      let s=data.text.split(" ");
      this.qr2=true;
      this.data.r2marks=-1;
      this.data.receipt=Number(s[0]);
      this.data.name=s[1];
      this.data.college=s[2];
      this.data.phone=Number(s[3]);
      this.data.rollno=s[4];
      this.data.email=s[5];  
      this.data.timestamp=new Date();
      console.log(this.data);
      this.us.scanUser2({eventname: this.data.eventname,receipt: this.data.receipt}).subscribe((baka)=>{
        if(baka['message']=='success'){
          var p:Event[]=[];
          Storage.get({key: this.event+"2"}).then((val)=>{
            if(val.value!=null)
              p=JSON.parse(val.value);
            p.push(this.data);
            console.log("success",p);
            Storage.set({key: this.event+"2",value: JSON.stringify(p)});
          });
          alert("successfully registered for round2");
        }
        else if(baka['message']=='already registered'){
          alert("already registered");
        }
        else if(baka['message']=='not participated in round1'){
          alert("not a participant");
        }
      });
    });
  }

  UpdateMarksr1(){
    this.data={} as Event;
    this.qr1=false;
    this.router.navigate(['organizer/update/',this.event+"1"]);
  }

  ViewMarksr1(){
    this.qr1=false;
    this.router.navigate(['organizer/view/',this.event+"1"]);
  }

  UpdateMarksr2(){
    this.data={} as Event;
    this.qr2=false;
    this.router.navigate(['organizer/update/',this.event+"2"]);
  }

  ViewMarksr2(){
    this.qr2=false;
    this.router.navigate(['organizer/view/',this.event+"2"]);
  }

  logout(){
    this.us.removeItem('orgSession');
   this.router.navigate(['organizer']);
  }

}
