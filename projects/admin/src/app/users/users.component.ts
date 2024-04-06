import { Status } from './../status';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  page:any=1
  total:any
  dataSource:any[]=[]
  constructor(private _TasksService:TasksService,private translate:TranslateService){}

ngOnInit(): void {
this.allUsers()
}

allUsers(){
  this._TasksService.getUsers().subscribe({
    next:(response:any)=>{
      this.dataSource=response.users.filter((ele:any)=>{
        if(ele.role=="user"){
          return ele
        }
      })
      this.total=this.dataSource.length
    },
    error:(error)=>{
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
deleteUser(id:string,index:number){
  if(this.dataSource[index].assignedTasks>0){
    Swal.fire({
      icon: "error",
      title: "ops...",
      text:this.translate.instant("tsUser.error") ,
    });
  }else{
    this._TasksService.DeleteUser(id).subscribe({
      next:(response)=>{
        Swal.fire({
          icon: "success",
          title: "success",
          text:this.translate.instant("tsUser.delete") ,
        });
        this.allUsers()
      },
      error:(error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:error.error.message ,
          });
      }
    })
  }

}
changePage(event:any){
  this.page=event
  this.allUsers()
  }
changeUserStatus(status:string ,id:string,index:number){
  if(this.dataSource[index].assignedTasks>0){
    Swal.fire({
      icon: "error",
      title: "ops...",
      text:this.translate.instant("tsUser.errorDelete") ,
    });
  }else{
    const model:Status={
      id:id,
      status:status
    }
    this._TasksService.userStatus(model).subscribe({
      next:(response:any)=>{
        if(response.massage=='User Status Changed Successfully'){
          Swal.fire({
            icon: "success",
            title: "success",
            text:'',
          });
        }
        this.allUsers()
      },
      error:(error)=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:error.error.message ,
        });
      }
    })
  }

}
}
