import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IttopService } from '../ittop.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'models/user';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-offline-registration',
  templateUrl: './offline-registration.page.html',
  styleUrls: ['./offline-registration.page.scss'],
})
export class OfflineRegistrationPage implements OnInit {

  bo:boolean=false;
  registrationForm:FormGroup;
  submitted = false;
  userDetails:User={} as User;
  dbUsers:User[]=[];
  constructor(private us:IttopService,private alrt:AlertController,private fb:FormBuilder,private router:Router,
    private lc:LoadingController,private toastCtrl:ToastController) { }

  ngOnInit() {
    this.us.getString('regSession').then((res)=>{
      if(res==undefined){
        this.bo=false;
      }
      else if(res['value']=='true'){
        this.bo=true;
      }
    });
    this.us.getUsers().subscribe(data=>{
      if(data['message']=='success'){
        this.dbUsers=data['data'];
      }
      else
        console.log(data);
    });
    this.registrationForm = this.fb.group({
      email:    ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      name: ['',Validators.required],
      rollno: ['', Validators.required],
      college: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    });
  }

  get f() { 
    return this.registrationForm.controls; 
  }  

  authenticate(pass){
    this.lc.create({message:"please wait"}).then( (loading)=>{
      loading.present();
      setTimeout(()=>{
        this.us.getPass({name:"registrationpass"}).subscribe(data=>{
          if(data['message']=='success'){
            console.log(data,pass.value);
            if(data['data']==pass.value){
              this.bo=true;
              this.us.setString('regSession','true');
            }
            else{
              alert('Invalid credentials / Check your Internet connection');
            }
          }
          else{
            alert("some error occured. Please try again");
          }
        });
      loading.dismiss();
      },1000);
    });
  }

  logout(){
    this.bo=false;
    this.us.removeItem('regSession');
  }
  createCode(){
    this.submitted = true;
    if (this.registrationForm.invalid) {
        return;
    }
    this.us.validEmail({email:this.registrationForm.value.email}).subscribe(data=>{
      console.log(data);
      if(data==true){
        this.userDetails.name=this.registrationForm.value.name;
        this.userDetails.email=this.registrationForm.value.email;
        this.userDetails.phone=this.registrationForm.value.phone;
        this.userDetails.college=this.registrationForm.value.college;
        this.userDetails.rollno=this.registrationForm.value.rollno;
        this.userDetails.timestamp=new Date();
        console.log(this.userDetails);
        this.us.addUser(this.userDetails).subscribe((baka)=>{
          if(baka['message']=='already exists'){
            alert("email already registered");
          }
          else if(baka['message']=='success'){
            alert("receipt:"+baka['receipt']);
            this.router.navigate(['online-registration/',baka['receipt']]);
          }
          else{
            alert("some error occured.please try again");
          }
        });
      }
      else{
        alert('enter valid email address');
      }
    });
  }  
}
