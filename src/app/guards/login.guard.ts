import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IttopService } from '../ittop.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private us:IttopService){}
  async canActivate():Promise<boolean> {
    let f=0;
    await this.us.getObject('logSession').then((res)=>{
      if(res==undefined){
          f=0;
      }
      else if(res['user']=='participant'){
        f=0;
      }
      else if(res['user']=='organizer'){
        f=1;
      }
      else{
        f=0;
      }
    });
    if(f==1)
      return true;
    else{
      alert('not authorized');
      return false;
    }
  }
  
}
