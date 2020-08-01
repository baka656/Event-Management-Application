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

  loginp(){
    this.router.navigate(['login/','par']);
  }

  loginr(){
  this.router.navigate(['login/','org']);
  }
}
