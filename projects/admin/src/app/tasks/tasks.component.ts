import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent  implements OnInit{
  animal:any;
  name:any;
  dataSource:any[]=[]
  SelectDataSource:any[]=[]
  filteration:any={}
  timeoutId:any
  allUsers:any={userId:{_id:'',username:'All Users'}}
  status:any=[
    {name:'',allStatus:'All Status'},
    {name:'Complete'},
    {name:'In-Progress'}
  ]
  page:any=1
  total:any
  constructor(private _TasksService:TasksService,public dialog: MatDialog ,private translate:TranslateService){}

ngOnInit(): void {
this.getAllTasks()
this.getAllUsers()
let dir =document.querySelector('.dir')
if(localStorage.getItem('lang')=='en'){
  dir?.setAttribute("dir","ltr")
}else{
  dir?.setAttribute("dir","rtl")
}

}
// start search
search(event:any){
  this.filteration['keyword']=event.value
  clearTimeout(this.timeoutId)
  this.timeoutId=setTimeout(() => {
    this.getAllTasks()
  }, 1500);
}
selectUser(event:any){
  this.filteration['userId']=event.value
  this.getAllTasks()
}
selectStatus(event:any){
  this.filteration['status']=event.value
  this.getAllTasks()
}
selectDate(event:any,type:string){
  this.filteration[type]=moment(event.value).format('DD-MM-YYYY')
  console.log(this.filteration);
  if(type=='toDate'&&this.filteration['toDate']!=='Invalid date'){
    this.getAllTasks()
  }

}
// end search
getAllTasks(){
  this._TasksService.getAllTasks(this.filteration).subscribe({
    next:(response:any)=>{
      this.dataSource=response.tasks
      this.total=response.totalItems
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
getAllUsers(){
  this._TasksService.getAllTasks(this.filteration).subscribe({
    next:(response:any)=>{
      this.SelectDataSource=response.tasks
      this.SelectDataSource.unshift(this.allUsers)
    },
    error:(error)=>{
    }
  })
}

addTask(){
  let dialogRef = this.dialog.open(AddTaskComponent, {
    width:'750px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result ==true){
      this.getAllTasks()
    }
  });
}

updateTask(task:any){
  let dialogRef = this.dialog.open(AddTaskComponent, {
    width:'750px',
    data:task,
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result ==true){
      this.getAllTasks()
    }
  });
}

deleteTask(id:string){
  this._TasksService.DeleteTask(id).subscribe({
    next:(response)=>{
      this.getAllTasks()
    },
    error:(error)=>{
    }
  })
}

changePage(event:any){
this.page=event
}



}





