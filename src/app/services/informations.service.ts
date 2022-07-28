import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {
  constructor() {
    this.getCurrent()
  }

  varloginCurrent=""
  loginCurrent=new BehaviorSubject(this.varloginCurrent)
  loginCurrentChange=this.loginCurrent.asObservable()  

  baseUrl = "https://restaurantrestaurant.herokuapp.com"
  //baseUrl = "http://localhost:5000"
  
  stringLogin = "stringLogin"

  connecter(){
    localStorage.setItem(this.stringLogin, "admin")
    this.loginCurrent.next("admin")
    
  }

  deconnecter(){
    localStorage.setItem(this.stringLogin, "")
    this.loginCurrent.next("")
  
  }

  getCurrent(){
    var loginCurrent = localStorage.getItem(this.stringLogin)
    this.loginCurrent.next(loginCurrent)
  
    if(loginCurrent == null || loginCurrent == undefined){
      this.loginCurrent.next("")
    }
  }
}