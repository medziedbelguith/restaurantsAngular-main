import { Component, OnInit } from '@angular/core';
import { InformationsService } from '../../services/informations.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginCurrent
  
  constructor(public informationGenerale: InformationsService) {
  
    this.informationGenerale.loginCurrent.subscribe(x=>{
      this.loginCurrent = x
    })
  }

  ngOnInit(): void {
  }

}
