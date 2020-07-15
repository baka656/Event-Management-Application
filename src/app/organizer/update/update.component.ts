import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IttopService } from 'src/app/ittop.service';
import { Event } from 'models/events';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  event:string="";
  dataArray:Event[]=[];
  round:Number;
  constructor(private route:ActivatedRoute,private us:IttopService,private router:Router) { }

  ngOnInit() {
    this.event=this.route.snapshot.paramMap.get('id');
    this.round=Number(this.event.substr(this.event.length-1));
    console.log(this.round);
    Storage.get({key: this.event}).then((val)=>{
      this.dataArray=JSON.parse(val.value);
      console.log(val.value);
    });
  }

  update(a:Event,m1){
    if(this.round==1){
      a.r1marks=Number(m1);
      this.us.updateMarks1(a).subscribe((data)=>{
        if(data['message']=='success'){
          alert('updated');
          var baka:Event[]=[];
          for(var i of this.dataArray)
            if(a.receipt!=i.receipt)
              baka.push(i);
          Storage.set({key: this.event,value: JSON.stringify(baka)});
          this.dataArray=baka;
        }
        else{
          alert('not updated');
        }
      });
    }
    else if(this.round==2){
      a.r2marks=Number(m1);
      this.us.updateMarks2(a).subscribe((data)=>{
        if(data['message']=='success'){
          alert('updated');
          var baka:Event[]=[];
          for(var i of this.dataArray)
            if(a.receipt!=i.receipt)
              baka.push(i);
          Storage.set({key: this.event,value: JSON.stringify(baka)});
          this.dataArray=baka;
        }
        else{
          alert('not updated');
        }
      });
    }
  }

}
