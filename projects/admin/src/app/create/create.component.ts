import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private _LoginService:LoginService){}
  sendLoad:boolean=false
  adminForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    username:new FormControl(null,[Validators.required]),
    role:new FormControl('admin')
  })
  createForm(adminForm:FormGroup){
    this.sendLoad=true
    this._LoginService.createAdmin(adminForm.value).subscribe({
      next:(response)=>{
        this.sendLoad=false
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Admin created successfully",
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
