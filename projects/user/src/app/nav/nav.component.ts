import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  showNav:boolean=false
  lang:any="en"
constructor(private _LoginService:LoginService ,private translate:TranslateService){
  this._LoginService.userData.subscribe({
    next:()=>{
      if(this._LoginService.userData.getValue() != null){
        this.showNav=true
      }else{
        this.showNav=false
      }
    }
  })
  this.lang=this.translate.currentLang
}

  logout(){
    this._LoginService.logout()
  }
  changeLanguage(){
    if(this.lang == "en"){
      localStorage.setItem('lang','ar')
      this.lang="ar"
    }else{
      localStorage.setItem('lang','en')
      this.lang="en"
    }
    window.location.reload()
  }
}
