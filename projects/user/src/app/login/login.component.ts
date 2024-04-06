import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sendLoad:boolean=false
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    role:new FormControl('user')
  })
  constructor(private _LoginService:LoginService,private _Router:Router){}
  ngOnInit(): void {
    if(this._LoginService.userData.getValue() != null){
      this._Router.navigate(['/tasks'])
    }
  }
  createForm(loginForm:FormGroup){
    this.sendLoad=true
    this._LoginService.login(loginForm.value).subscribe({
      next:(response)=>{
        this.sendLoad=false
        console.log(response);
        localStorage.setItem('userToken',response.token)
        this._LoginService.decodedeUserData()
        this.sendLoad=false
        this._Router.navigate(['/tasks'])
      },
      error:(error)=>{
        this.sendLoad=false
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message,
        });
      }
    })
  }
}
