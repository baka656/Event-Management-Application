import { Component, OnInit } from '@angular/core';
import { User } from 'models/user';
import { IttopService } from '../ittop.service';

@Component({
  selector: 'app-get-my-qr',
  templateUrl: './get-my-qr.page.html',
  styleUrls: ['./get-my-qr.page.scss'],
})
export class GetMyQrPage implements OnInit {

  rno:number;
  registerUser:User={} as User;
  qrdata:string;
  bo:boolean=true;
  
  constructor(private us:IttopService) { }

  getqr(r,m) {
    this.rno=Number(r);
    console.log(this.rno,m);
    this.us.getUser({receipt: this.rno}).subscribe(data=>{
      if(data['message']=='success'){
        this.registerUser=data['data'];
        if(this.registerUser.phone.toString()==m){
          this.bo=false;
          this.qrdata=this.registerUser.receipt.toString().replace(/\s/g,"")+" "+this.registerUser.name.replace(/\s/g,"")+" "+
            this.registerUser.college.replace(/\s/g,"")+" "+this.registerUser.phone.toString().replace(/\s/g,"")+" "+
            this.registerUser.rollno.replace(/\s/g,"")+" "+this.registerUser.email.replace(/\s/g,"");
          console.log(this.qrdata);
        }
        else{
          alert("Invalid details");
        }
      }
      else{
        alert(data);
      }
    });
  }

  done(){
    this.bo=true;
  }
  ngOnInit() {
  }

}
