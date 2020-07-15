import { Component, OnInit } from '@angular/core';
import { IttopService } from 'src/app/ittop.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'models/user';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-qrgenerate',
  templateUrl: './qrgenerate.component.html',
  styleUrls: ['./qrgenerate.component.scss'],
})
export class QrgenerateComponent implements OnInit {

  rno:number;
  registerUser:User={} as User;
  qrdata:string;
  constructor(private us:IttopService,private route:ActivatedRoute,private navCtrl: NavController ) { }

  ngOnInit() {
    this.rno=Number(this.route.snapshot.paramMap.get('id'));
    this.us.getUser({receipt: this.rno}).subscribe(data=>{
      if(data['message']=='success'){
        this.registerUser=data['data'];
        this.qrdata=this.registerUser.receipt.toString().replace(/\s/g,"")+" "+this.registerUser.name.replace(/\s/g,"")+" "+
          this.registerUser.college.replace(/\s/g,"")+" "+this.registerUser.phone.toString().replace(/\s/g,"")+" "+
          this.registerUser.rollno.replace(/\s/g,"")+" "+this.registerUser.email.replace(/\s/g,"");
        console.log(this.qrdata);
      }
      else{
        alert(data);
      }
    });
  }

  done(){
    this.navCtrl.back();
  }

}
