import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';import { Router } from '@angular/router';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private http: HttpClient, private informationGenerale: InformationsService ) { }

  request = {
    email:"",
    password:"",
  }

  ngOnInit(): void {
  }

  
  envoyerRequest(){
    
     if(this.request.email == "admin@gmail.com" && this.request.password == "123456"){
       alert("connectez avec succee !!")
       this.informationGenerale.connecter()
     }else{
      alert("Email ou mot de passe sont fausses !!")
      this.informationGenerale.deconnecter()
     }
    
  }

}
