import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'models/events';
import { IttopService } from 'src/app/ittop.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {

  users:Event[]=[];
  ittop:Event[]=[];
  event:string="";
  round:Number;
  ename:string;
  constructor(private us:IttopService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.event=this.route.snapshot.paramMap.get('id');
    this.round=Number(this.event.substr(this.event.length-1));
    this.ename=this.event.slice(0,-1);
    console.log(this.ename);
    this.us.getRegEvent({eventname: this.ename}).subscribe((data)=>{
      if(data['message']=='success'){
        this.users=data['data'];
        this.ittop=data['data'];
        if(this.round==1){
          this.users.sort((a,b)=>b.r1marks-a.r1marks); 
          this.ittop.sort((a,b)=>b.r1marks-a.r1marks); 
          console.log(this.users);
        }
        else if(this.round==2){
          this.users.sort((a,b)=>b.r2marks-a.r2marks); 
          this.ittop.sort((a,b)=>b.r2marks-a.r2marks); 
        }
      }
      else{
        alert('some error');
      }
    });
    
  }

  search1(s){
    console.log(s,typeof(s));
    var ss=Number(s);
    this.users=[];
    for(var i of this.ittop)
      if(i.receipt==ss)
        this.users.push(i);
  }

  clear(){
    document.querySelector('ion-input').value='';
    this.users=this.ittop;
  }
}
