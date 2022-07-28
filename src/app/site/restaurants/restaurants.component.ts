import { Component, OnInit } from '@angular/core';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(private http: HttpClient, public informationGenerale: InformationsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getClients()
  }

  restaurants = []
  getClients() {
    var request = { page:1, limit:10000}
    
    this.http.post(this.informationGenerale.baseUrl + "/restaurants/listRestaurants", request).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.restaurants = resultat.resultat.docs
          console.log(this.restaurants)
        } 
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

}
