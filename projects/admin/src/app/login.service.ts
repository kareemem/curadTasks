import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData= new BehaviorSubject(null)
  encodedToken:any
  decodedToken:any
  urlApi:string='https://crud-7q3c.onrender.com'
  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem('userToken') !== null){
      this.decodedeUserData()
    }
  }
login(model:Login):Observable<any>{
return this._HttpClient.post(`${this.urlApi}/auth/login`,model)
}
createAdmin(model:Login):Observable<any>{
return this._HttpClient.post(`${this.urlApi}/auth/createAccount`,model)
}


decodedeUserData(){
  this.encodedToken=JSON.stringify(localStorage.getItem('userToken'))
  this.decodedToken=jwtDecode(this.encodedToken)
  this.userData.next(this.decodedToken)
}
logout(){
  localStorage.removeItem('userToken')
  this.userData.next(null)
  this._Router.navigate(['/login'])
}



}
