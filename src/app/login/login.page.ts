import { Component, OnInit } from '@angular/core';
import { IttopService } from '../ittop.service';
import { ParseSpan } from '@angular/compiler';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  org:boolean=false;
  constructor(private us:IttopService,private router:Router,public ac:AppComponent) { }

  ngOnInit() {
  }
  baka(x){
    if(x=="1")
      this.org=false;
    else  
      this.org=true;
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
