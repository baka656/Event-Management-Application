import { Component, OnInit } from '@angular/core';
import { IttopService } from 'src/app/ittop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  event:string="";
  boo:boolean=false;
  constructor(private us:IttopService,private router:Router,public ac:AppComponent,private route:ActivatedRoute) { }

  ngOnInit() {
    this.event=this.route.snapshot.paramMap.get('id');
    if(this.event=="par")
      this.boo=true;
    else if(this.event=="org")
      this.boo=false;
  }

  loginp(r,m){
    this.us.getUser({receipt: Number(r)}).subscribe(data=>{
      if(data['message']=='success'){
        if(data['data']['phone']==Number(m)){
          alert('sucessfully logged in');
          this.router.navigate(['events']);
          this.us.setObject('logSession',{user: 'participant',name: data['data']['name'],receipt: data['data']['receipt'].toString()}).then(()=>{
            this.ac.initializeApp();
          }); 
        }
        else{
          alert('invalid credintials');
        }
      }
      else if(data['message']=='donot exist'){
        alert('participant not registered')
      }
    })
  }

  loginr(pass){
    this.us.getPass({name: 'organizerlogin'}).subscribe((data)=>{
      if(data['message']=='success'){
        if(data['data']==pass){
          alert('sucessfully logged in');
          this.us.setObject('logSession',{user: 'organizer'}).then(()=>{
            this.ac.initializeApp();
          });
          this.router.navigate(['events']);
        }
        else{
          alert('Invalid credentials');
        }
      }
      else{
        alert('some error');
      }
    });
  }

}
