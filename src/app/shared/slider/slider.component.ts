import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }
  
  sliders=[]

  ngOnInit(): void {
    const timer = interval(5000);

    timer.subscribe((n) => {
     
      this.carouselAuto()

    })

  }


  slideIndex = 1;
  isClick = false;
  
  carouselAuto() {
    if(this.nbrIsAuto == 0){
       this.showDivs(this.slideIndex + 1)
    }
  }

  nbrIsAuto = 0

  plusDivs(n) {
   this.nbrIsAuto++

    if(!this.isClick){
      this.showDivs(this.slideIndex + n);
    }
    
    setTimeout(() => {
      this.nbrIsAuto--
    },  5000);
  }

  setDivs(n) {
    this.nbrIsAuto++
    
    this.showDivs(n+1);

    setTimeout(() => {
      this.nbrIsAuto--
    },  5000);
    
  }

  showDivs(slideIndexSuivant) {
 

    this.isClick = true
  
    var x = document.getElementsByClassName("item-slider");
    
    if (slideIndexSuivant > x.length){
      slideIndexSuivant = 1
    }else if (slideIndexSuivant < 1){
      slideIndexSuivant = x.length
    }
  
    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute("style", "transform :translateX("+(-100 * (slideIndexSuivant-1))+"%)")
    }
  
    this.slideIndex = slideIndexSuivant
  
    setTimeout(() => {
      this.isClick = false
    },  800);
  
  }


}