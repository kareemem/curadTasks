import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from './register';
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
createUser(model:Register):Observable<any>{
return this._HttpClient.post(`${this.urlApi}/auth/createAccount`,model)
}

decodedeUserData(){
  this.encodedToken=JSON.stringify(localStorage.getItem('userToken'))
  this.decodedToken=jwtDecode(this.encodedToken)
  this.userData.next(this.decodedToken)
}
getTasks(ID:any,tasksParams:any){
  let params =new HttpParams()
  Object.entries(tasksParams).forEach(([key,value]:any)=>{
    params=params.append(key,value)
  })
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.get(`${this.urlApi}/tasks/user-tasks/${ID}`,{
  headers,
  params
})
}
completeTasks(id:object){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.put(`${this.urlApi}/tasks/complete`,id,{
  headers,

})
}
detailsTasks(id:any){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.get(`${this.urlApi}/tasks/task/${id}`,{
  headers,

})
}

logout(){
  localStorage.removeItem('userToken')
  this.userData.next(null)
  this._Router.navigate(['/login'])
}
}
