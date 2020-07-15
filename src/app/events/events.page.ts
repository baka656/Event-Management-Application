import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IttopService } from '../ittop.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  eventsData:Event[]=[];
  constructor(private router:Router,private it:IttopService) { }

  ngOnInit() {
    this.it.getEvents().subscribe((data)=>{
      if(data['message']=='success'){
        this.eventsData=data['data'];
        console.log(this.eventsData);
      }
      else
        console.log(data);  
    });
  }
  goTo(x){
    this.router.navigate(['events/',x.eventname]);  
   }

}
