import { Component ,Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { CreateTask } from '../create-task';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  fileName:string=''
  sendLoad:boolean=false
  formValues:any
  constructor(
    private _TasksService:TasksService,
    public dialog:MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask:any,
    public matDialog: MatDialog,
    private translate:TranslateService
  ){}


  taskForm:FormGroup=new FormGroup({
  title:new FormControl(this.dataTask?.title || null ,[Validators.required ,Validators.minLength(5)]),
  userId:new FormControl(this.dataTask?.userId._id || null ,[Validators.required]),
  image:new FormControl(this.dataTask?.image || null ,[Validators.required]),
  description:new FormControl(this.dataTask?.description || null ,[Validators.required]),
  deadline:new FormControl(this.dataTask?new Date (this.dataTask?.deadline.split('-').reverse().join('-')).toISOString() : null ,[Validators.required])
})

ngOnInit(): void {
  this.formValues=this.taskForm.value
  this.getAllUsers()
}

selectImage(event:any){
this.fileName=event.target.value
this.taskForm.get('image')?.setValue(event.target.files[0])
}
users:any = [

]
dataUsers:any = [

]

CreateTask(){
  this.sendLoad=true
  let model=this.prepereFormData()
  this._TasksService.CreateTask(model).subscribe({
    next:(response)=>{
      console.log(response);
  this.sendLoad=false
      Swal.fire({
        icon: "success",
        title: "Success",
        text: this.translate.instant('ts.done') ,
      });
      this.dialog.close(true)
    },
    error:(error)=>{
      if(error.error.message=='jwt expired'){
  this.sendLoad=false
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:this.translate.instant('ts.errorSession') ,
        });
      }
    }
  })
}
prepereFormData(){
  let newData =moment(this.taskForm.value['deadline']).format('DD-MM-YYYY')
  let formData =new FormData()
  Object.entries(this.taskForm.value).forEach(([key,value]:any)=>{
    if(key == 'deadline'){
      formData.append(key,newData)
    }else{
      formData.append(key,value)
    }
  })
  return formData
}

updateTask(){
  this.sendLoad=true
  let model=this.prepereFormData()
  this._TasksService.UpdateTask(model,this.dataTask._id).subscribe({
    next:(response)=>{
      console.log(response);
  this.sendLoad=false
      Swal.fire({
        icon: "success",
        title: "Success",
        text: this.translate.instant("ts.doneU") ,
      });
      this.dialog.close(true)
    },
    error:(error)=>{
      if(error.error.message=='jwt expired'){
  this.sendLoad=false
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: this.translate.instant('ts.errorSession') ,
        });
      }
    }
  })
}

close(){
  let hasChanges=false
  Object.keys(this.formValues).forEach((item:any)=>{
    if(this.formValues[item] !== this.taskForm.value[item]){
      hasChanges=true
    }
  })
  if(hasChanges){
    let dialogRef = this.matDialog.open(ConfirmationComponent, {
      width:'750px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result ==true){
      }
    });
  }else{
    this.dialog.close()
  }
}

getAllUsers(){
  this._TasksService.getUsers().subscribe({
    next:(response)=>{
      this.dataUsers=response
      console.log(this.dataUsers.users);
      for(let i=0;i<this.dataUsers.users.length;i++){
        if(this.dataUsers.users[i].role=='user'){
          this.users.push(this.dataUsers.users[i])
        }
      }
      console.log(this.users);

    },
    error:(error)=>{
      console.log(error);
    }
  })
}


}
