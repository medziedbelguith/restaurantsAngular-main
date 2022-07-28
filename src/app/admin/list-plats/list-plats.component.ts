import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from '../../services/informations.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-plats',
  templateUrl: './list-plats.component.html',
  styleUrls: ['./list-plats.component.css']
})
export class ListPlatsComponent implements OnInit {

 
  
  formC:FormGroup
  
  constructor(private fb:FormBuilder, private router:Router, private http: HttpClient, private informationGenerale: InformationsService) {
   
    this.formC = this.fb.group({
      nom:[''],
      prix:[''],
      description:[''],
      
      limit:10
    })

    this.getClients()

  }

  gotToAdd(){
    this.router.navigate(['/AddPlat']);
  }

  objectKeys = Object.keys;

  items = {
    nom:'active',
    prix:'active',
    description:'active',
  };

  itemsVariable = { 
    nom:'active',
    prix:'active',
    description:'active',
  };

  request = { 
    search:{
      nom:"",
      description:"",
    },
    orderBy:{ 
      nom:0,
      description:0,
    },
    limit: 10,
    page:1
  } 

  oldRequest = { 
    search:{
      nom:"",
      description:"",
    },
    orderBy:{ 
      nom:0,
      description:0,
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

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + "/plats/listPlats", this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        console.log(res)
        if (resultat.status) {
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

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""
  lienDelete = "/plats/deletePlat"
  
  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienDelete +"/"+this.idDeleteModal, {}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getClients()
            this.closeModalDelete()
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2){
    this.idDeleteModal = id
    console.log(this.idDeleteModal)
    this.isOpenModalDelete = true
    this.params1Delete = "Le Plat"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }


}