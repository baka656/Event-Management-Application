import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class IttopService {

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

  
  /*getUsers(){
    return this.http.post('http://localhost:8080/user/getUsers',{});
  }
  getUser(obj){
    return this.http.post('http://localhost:8080/user/getUser',obj);
  }
  addUser(obj){
    return this.http.post('http://localhost:8080/user/addUser',obj);
  }
  scanUser1(obj){
    return this.http.post('http://localhost:8080/user/scanUser1',obj);
  }
  scanUser2(obj){
    return this.http.post('http://localhost:8080/user/scanUser2',obj);
  }
  updateMarks1(obj){
    return this.http.post('http://localhost:8080/user/updateMarks1',obj);
  }
  updateMarks2(obj){
    return this.http.post('http://localhost:8080/user/updateMarks2',obj);
  }
  getEvents(){
    return this.http.post('http://localhost:8080/user/getEvents',{});
  }
  getEvent(obj){
    return this.http.post('http://localhost:8080/user/getEvent',obj);
  }
  getCount(obj){
    return this.http.post('http://localhost:8080/user/getCount',obj);
  }
  validEmail(obj){
    return this.http.post('http://localhost:8080/user/validEmail',obj);
  }
  getPass(obj){
    return this.http.post('http://localhost:8080/user/getPass',obj);
  }
  getRegEvent(obj){
    return this.http.post('http://localhost:8080/user/getRegEvent',obj);
  }*/
  

  //deploy
  getUsers(){
    return this.http.post('/user/getUsers',{});
  }
  getUser(obj){
    return this.http.post('/user/getUser',obj);
  }
  addUser(obj){
    return this.http.post('/user/addUser',obj);
  }
  scanUser1(obj){
    return this.http.post('/user/scanUser1',obj);
  }
  scanUser2(obj){
    return this.http.post('/user/scanUser2',obj);
  }
  updateMarks1(obj){
    return this.http.post('/user/updateMarks1',obj);
  }
  updateMarks2(obj){
    return this.http.post('/user/updateMarks2',obj);
  }
  getEvents(){
    return this.http.post('/user/getEvents',{});
  }
  getEvent(obj){
    return this.http.post('/user/getEvent',obj);
  }
  getCount(obj){
    return this.http.post('/user/getCount',obj);
  }
  validEmail(obj){
    return this.http.post('/user/validEmail',obj);
  }
  getPass(obj){
    return this.http.post('/user/getPass',obj);
  }
  getRegEvent(obj){
    return this.http.post('/user/getRegEvent',obj);
  }
}