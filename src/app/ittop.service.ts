import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class IttopService {

  //mlink:string="http://localhost:8080";
  mlink:string="https://ecficiom.herokuapp.com";
  //mlink="";
  constructor(private http:HttpClient) { }


  //Capacitor Storage Methods
  async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }
  async getString(key: string): Promise<{ value: any }> {
      return (await Storage.get({ key }));
  }
  async setObject(key: string, value: any) {
      await Storage.set({ key, value: JSON.stringify(value) });
  }
  async getObject(key: string): Promise<{ value: any }> {
      const ret = await Storage.get({ key });
      return JSON.parse(ret.value);
  }
  async removeItem(key: string) {
      await Storage.remove({ key });
  }
  async clear() {
      await Storage.clear();
  }

  //deploy
  getUsers(){
    return this.http.post(this.mlink+'/user/getUsers',{});
  }
  getUser(obj){
    return this.http.post(this.mlink+'/user/getUser',obj);
  }
  addUser(obj){
    return this.http.post(this.mlink+'/user/addUser',obj);
  }
  scanUser1(obj){
    return this.http.post(this.mlink+'/user/scanUser1',obj);
  }
  scanUser2(obj){
    return this.http.post(this.mlink+'/user/scanUser2',obj);
  }
  updateMarks1(obj){
    return this.http.post(this.mlink+'/user/updateMarks1',obj);
  }
  updateMarks2(obj){
    return this.http.post(this.mlink+'/user/updateMarks2',obj);
  }
  getEvents(){
    return this.http.post(this.mlink+'/user/getEvents',{});
  }
  getEvent(obj){
    return this.http.post(this.mlink+'/user/getEvent',obj);
  }
  getCount(obj){
    return this.http.post(this.mlink+'/user/getCount',obj);
  }
  validEmail(obj){
    return this.http.post(this.mlink+'/user/validEmail',obj);
  }
  getPass(obj){
    return this.http.post(this.mlink+'/user/getPass',obj);
  }
  getRegEvent(obj){
    return this.http.post(this.mlink+'/user/getRegEvent',obj);
  }
  razorpayOrder(){
    return this.http.post(this.mlink+'/user/razorpayOrder',{});
  }
}