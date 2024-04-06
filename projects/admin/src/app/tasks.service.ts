import { CreateTask } from './create-task';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from './status';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  urlApi:string='https://crud-7q3c.onrender.com'
  constructor(private _HttpClient:HttpClient) {

  }


  getAllTasks(filter:any){
    let headers = new HttpHeaders()
    headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
    let params=new HttpParams()
    Object.entries(filter).forEach(([key,value]:any)=>{
      if(value){
        params=params.append(key,value)
      }
    })
    return this._HttpClient.get(`${this.urlApi}/tasks/all-tasks`,{
    headers,
    params
  })
  }

CreateTask(model:any){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.post(`${this.urlApi}/tasks/add-task`,model,{
  headers
})
}

UpdateTask(model:any , id:any){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.put(`${this.urlApi}/tasks/edit-task/${id}`,model,{
  headers
})
}

DeleteTask(id:string){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.delete(`${this.urlApi}/tasks/delete-task/${id}`,{
  headers
})
}
DeleteUser(id:string){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.delete(`${this.urlApi}/auth/user/${id}`,{
  headers
})
}
getUsers(){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.get(`${this.urlApi}/auth/users`,{
  headers
})
}
userStatus(model:Status){
  let headers = new HttpHeaders()
  headers=headers.append('Authorization','Bearer '+localStorage.getItem('userToken'))
  return this._HttpClient.put(`${this.urlApi}/auth/user-status`,model,{
  headers
})
}
}
