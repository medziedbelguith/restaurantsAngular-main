import { Component, OnInit } from '@angular/core';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  constructor(private http: HttpClient, public informationGenerale: InformationsService, private route: ActivatedRoute) { }

  id=""

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id.length > 1){
      this.getPlats(this.id)
    }
  }

  restaurants = []
  plats = []
  getPlats(idRestaurant) {

    this.http.get(this.informationGenerale.baseUrl + "/plats/getByRestaurant/"+idRestaurant).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.plats = resultat.plats
          console.log(this.plats)
        } 
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

}
