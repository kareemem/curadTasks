import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { CreateComponent } from './create/create.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'tasks',canActivate:[authGuard],component:TasksComponent},
  {path:'createAdmin',component:CreateComponent},
  {path:'users',canActivate:[authGuard],component:UsersComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
