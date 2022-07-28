import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from '../../services/informations.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {

 
  
  formC:FormGroup
  
  constructor(private fb:FormBuilder, private router:Router, private http: HttpClient, private informationGenerale: InformationsService) {
   
    this.getClients()

  }

  gotToAdd(){
    this.router.navigate(['/AddPlat']);
  }

  objectKeys = Object.keys;

  items = {
    nom:'active',
    email:'active',
    telephone:'active',
    nbrPlaces:'active',
    restaurant:'active',
    date:'active',
    heure:'active',
  };

  itemsVariable = { 
    nom:'active',
    email:'active',
    telephone:'active',
    nbrPlaces:'active',
    restaurant:'active',
    date:'active',
    heure:'active',
  };

  request = { 
    search:{
    },
    orderBy:{
    },
    limit: 10,
    page:1
  } 

  oldRequest = { 
    search:{
    },
    orderBy:{
    },
    limit: 10,
    page:1
  } 
  
  ngOnInit(): void {
  }

  isLoading = false

  clients = []

  getClients() {

    if (this.isLoading) {
      return
    }

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + "/reservations/listReservations", this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        console.log(res)
        if (resultat.status) {
          console.log(resultat.resultat.docs)
          this.clients = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getClients()
          }
        } 
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  testSyncronisation(request1, request2){
    for(let key in request1.search){
      if(request1.search[key] != request2.search[key]){
        return false
      }
    }
 
    for(let key in request1.orderBy){
      if(request1.orderBy[key] != request2.orderBy[key]){
        return false
      }
    }
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getClients()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients()
  }

  changeCroissante(key){
    var classStyle = key+"-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if(this.request.orderBy[key] == 1){
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    }else{
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for(let varkey in  this.request.orderBy){
      if(key != varkey){
         this.request.orderBy[varkey] = 0
      }
    }
    
    this.getClients()
  }


  activationCroissante(buttons1, buttons2){
    var buttons = document.getElementsByClassName("croissante");

    for(let i = 0; i < buttons.length; i++){
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante","")
      buttons[i].setAttribute("class", classList) 
    }
   
    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante","")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }


}