import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
ID:any
taskDetails:any
showBtnComplete:boolean=true
constructor(private _LoginService:LoginService , private _ActivatedRoute:ActivatedRoute, private translate:TranslateService,private _Router:Router){}
ngOnInit(): void {
    this.details()
    let dir =document.querySelector('.dir')
if(localStorage.getItem('lang')=='en'){
  dir?.setAttribute("dir","ltr")
}else{
  dir?.setAttribute("dir","rtl")
}
}
details(){
this._ActivatedRoute.paramMap.subscribe((params)=>{
    this.ID=params.get('id')
  })
  this._LoginService.detailsTasks(this.ID).subscribe({
    next:(response:any)=>{
      console.log(response);
      this.taskDetails=response.tasks
      if(response.tasks.status=="Complete"){
        this.showBtnComplete=false
      }
    },
    error:(error)=>{
      console.log(error);
      if(error.error.message=='jwt expired'){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:this.translate.instant("ts.errorSession") ,
        });
      }
    }
  })
}
complete(ID:any){
  const MODEL={
    id:ID
  }
  this._LoginService.completeTasks(MODEL).subscribe({
    next:(response)=>{
      this.details()
      Swal.fire({
        icon: "success",
        title: "success",
        text:'task Complete Successfully' ,
      });
      this._Router.navigate(['/tasks'])
    },error:(error)=>{
      // console.log(error);
    }
  })
}
}
