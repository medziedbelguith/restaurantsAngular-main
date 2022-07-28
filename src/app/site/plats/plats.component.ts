import { Component, OnInit } from '@angular/core';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.css']
})
export class PlatsComponent implements OnInit {

  constructor(private http: HttpClient, public informationGenerale: InformationsService, private route: ActivatedRoute) { }

  id=""

  ngOnInit(): void {
    this.getPlats()
  }

  plats = []
  getPlats() {

    this.http.get(this.informationGenerale.baseUrl + "/plats/getAllPlats").subscribe(

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
