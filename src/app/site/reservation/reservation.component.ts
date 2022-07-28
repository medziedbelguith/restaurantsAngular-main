import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';import { Router } from '@angular/router';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor( private http: HttpClient, private informationGenerale: InformationsService ) { }

  request = {
    nom:"",
    email:"",
    telephone:"",
    nbrPlaces:"1",
    restaurant:"",
    date:"",
    heure:""
  }
  ngOnInit(): void {
  }

  isLoading = false

  envoyerRequest(){
    
    if(this.isLoading){
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl+"/reservations/newReservation", this.request).subscribe(
      res => {
        this.isLoading = false
        //this.notificationService.showSuccess(this.notificationService.sucessProduitEnregistrer, "Message")
        alert("Votre Reservation est bien enregistrée")
      }, err => {
        this.isLoading = false
        //alert(this.notificationService.alertNotConnexion)
      }
    );
    
  }

}
