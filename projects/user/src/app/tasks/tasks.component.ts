import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  dataSource:any
  page:any=1
  total:any
  selectedStatus:string="In-Progress"
  showBtnComplete:boolean=true
  constructor(private _LoginService:LoginService,private translate:TranslateService){}
  ngOnInit(): void {
    this.getAllTasks()
    let dir =document.querySelector('.dir')
    if(localStorage.getItem('lang')=='en'){
      dir?.setAttribute("dir","ltr")
    }else{
      dir?.setAttribute("dir","rtl")
    }
  }
    selectInProgress(){
      this.selectedStatus='In-Progress'
      this.getAllTasks()
      this.showBtnComplete=true
    }
    selectComplete(){
      this.selectedStatus='Complete'
      console.log(this.selectedStatus);
      this.getAllTasks()
      this.showBtnComplete=false
    }

getAllTasks(){
      let params ={
        page:1,
        limit:10,
      status:this.selectedStatus
    }
    let id = this._LoginService.decodedToken.userId
    this._LoginService.getTasks(id,params).subscribe({
      next:(response:any)=>{
        this.dataSource=response.tasks
      },
      error:(error)=>{
        this.dataSource=[]
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

changePage(event:any){
    this.page=event
    this.getAllTasks()
    }
    complete(ID:any){
      const MODEL={
        id:ID
      }
      this._LoginService.completeTasks(MODEL).subscribe({
        next:(response)=>{
          this.getAllTasks()
          Swal.fire({
            icon: "success",
            title: "success",
            text:'task Complete Successfully' ,
          });
        },error:(error)=>{
          // console.log(error);
        }
      })
    }
}
