import { Register } from './../register';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _LoginService:LoginService){}
  sendLoad:boolean=false
  userForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    confirmPassword:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    username:new FormControl(null,[Validators.required]),
  },{ validators: this.checkPassword })
  checkPassword(form: any) {
    let password = form.get('password');
    let confirmPassword = form.get('confirmPassword');
    if (password.value === confirmPassword.value) {
      return null;
    } else {
      confirmPassword.setErrors({ confirmPasswordMatch: 'confirmPassword not matched' });
      return { confirmPasswordMatch: 'confirmPassword not matched' };
    }
  }
  createForm(){
    this.sendLoad=true
    const MODEL:Register={
      username:this.userForm.value['username'],
      email: this.userForm.value['email'],
      password:this.userForm.value['password'],
      role:'user'
    }
    this._LoginService.createUser(MODEL).subscribe({
      next:(response)=>{
        this.sendLoad=false
        Swal.fire({
          icon: "success",
          title: "success",
          text: "User created successfully",
        });
      },error:(error)=>{
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
