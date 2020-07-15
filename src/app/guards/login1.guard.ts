import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IttopService } from '../ittop.service';

@Injectable({
  providedIn: 'root'
})
export class Login1Guard implements CanActivate {
  f=0;
  constructor(private us:IttopService){
    
  }
  
  async canActivate():Promise<boolean> {
    let f=0;
    await this.us.getObject('logSession').then((res)=>{
      if(res==undefined){
          f=1;
      }
      else{
        f=0;
      }
    });
    if(f==0){
      alert('already logged in');
      return false;
    }
    else{
      return true;
    }
  }
  
}
