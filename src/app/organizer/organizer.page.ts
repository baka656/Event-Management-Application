import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IttopService } from '../ittop.service';
import { Event } from 'models/events';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.page.html',
  styleUrls: ['./organizer.page.scss'],
})
export class OrganizerPage implements OnInit {

  events:Event[]=[];
  constructor(private router:Router,private us:IttopService,private lc:LoadingController,private toastCtrl:ToastController) { }

  ngOnInit() {
    this.us.getObject('orgSession').then((res)=>{
      if(res==undefined){
        this.us.getEvents().subscribe(data=>{
          if(data['message']=='success'){
            this.events=data['data'];
          }
        });
      }
      else if(res['auth']=='true'){
        this.router.navigate(['organizer/',res['event']]);
      }
    });
  }

  SelectedEvent(x,e){
    console.log(e);
    if(e==""){
      alert('nope');
    }
    else{
      this.lc.create({message:"please wait"}).then( (loading)=>{
        loading.present();
        setTimeout(()=>{
          this.us.getPass({name:"organizerpass"}).subscribe(data=>{
            if(data['message']=='success'){
              if(data['data']==x){
                this.us.setObject('orgSession',{auth: 'true',event: e});
                this.router.navigate(['organizer/',e]);
              }
              else{
                alert('Invalid credentials / Check your Internet connection');
              }
            }
            else{
              alert('some error');
            }
          });
        loading.dismiss();
        },1000);
      });
    }
  }
}
