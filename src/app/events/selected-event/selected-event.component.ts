import { Component, OnInit } from '@angular/core';
import { Event } from 'models/events';
import { ActivatedRoute } from '@angular/router';
import { IttopService } from 'src/app/ittop.service';
import { EventsInfo } from 'models/eventsinfo';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.scss'],
})
export class SelectedEventComponent implements OnInit {
  selectedItem:string;
  selectedEvent:EventsInfo={};
  tp=0;
  ap=0;
  constructor(private route:ActivatedRoute,private it:IttopService) { 
    
  }

  ngOnInit() {
    this.selectedItem=this.route.snapshot.paramMap.get('id');
    this.it.getEvent({eventname: this.selectedItem}).subscribe((data:Event)=>{
      if(data['message']=='success'){
        this.selectedEvent=data['data'];
      }
      else
        console.log(data);
    });

    this.it.getCount({eventname: this.selectedItem}).subscribe(data=>{
      if(data['message']=='success'){
        this.tp=data['tp'];
        this.ap=data['ap'];
        console.log(data);
      }
      else
        console.log(data);
    });
  /*
    this.fs.getUsers(this.selectedItem.eventname).valueChanges().subscribe((da:User[])=>{
      this.dbUsers=da;
    })
      
    
     console.log(this.dbUsers);
     this.fs.getUsers('participants').valueChanges().subscribe((da:User[])=>{
      this.dbUsers1=da;
    })*/
  }

}
