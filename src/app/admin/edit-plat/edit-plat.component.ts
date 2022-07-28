import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-plat',
  templateUrl: './edit-plat.component.html',
  styleUrls: ['./edit-plat.component.css']
})
export class EditPlatComponent implements OnInit {

  formC:FormGroup

  fileSources = []

  categories = []

  caracteristiques = []

  listCategoriesShema=[]
  listCategories=[]
  listDescriptionsDessous=[]
  listDescriptionsDessus=[]
  
  longDesc

  constructor( private http: HttpClient, private informationGenerale: InformationsService, private route: ActivatedRoute ) { 
    
    this.formC = new FormGroup({
      nom:new FormControl('',[Validators.required, Validators.min(1)]),
      description:new FormControl('',[Validators.required, Validators.min(1)]),
      prix:new FormControl(0,[Validators.required, Validators.min(1)]),
    
      file: new FormControl('', [Validators.required]),
      
     })

  }

  isOnLine=1
  setOnline(pos){
    this.isOnLine = pos
  }

  get f(){
    return this.formC.controls;
  }

  id

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id.length > 1){
      this.getPlat(this.id)
    }
    this.getClients()
  }

  item:any

  getPlat(id){
    if(this.isLoading){
      return 
    }

    this.isLoading = true;

    this.http.get(this.informationGenerale.baseUrl+"/plats/getById/"+this.id).subscribe(
      res => {
        
        var response: any = res
        this.isLoading = false;

        if(response.status){
          
          this.item = response.resultat
          
          this.formC = new FormGroup({
            nom:new FormControl(response.resultat.nom,[Validators.required, Validators.min(1)]),
            description:new FormControl(response.resultat.description,[Validators.required, Validators.min(1)]),
            prix:new FormControl(response.resultat.prix,[Validators.required, Validators.min(1)]),
          
            file: new FormControl('', [Validators.required]),
            
           })
           this.restaurant = response.resultat.restaurant
        }
      }, err => {
        //alert(this.notificationService.alertNotConnexion)
        this.isLoading = false;
        return 
      }
    );

  }


 
  // Gestion des DescriptionDessus --fin--

  // Gestion des photos --debut--
  multiImage
  imageSelected
  imageSelectedSource

  selectedM(event) {
     this.multiImage = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.imageSelectedSource = files[0]
     
     var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
       return;
     }

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.imageSelected = reader.result
     }
  }


  // Gestion des photos --fin--
 
  restaurant = ""

  clickRestaurant(id){
    this.restaurant = id
  }

  removeRestaurant(){
    this.restaurant = ""
  }

  isCheked(item){
    return this.restaurant == item.id
  }
 
  
  isLoading = false;
  erreurString = []
  isErreurs = false;

  chargerErreurs(){
    this.erreurString = []
    this.isErreurs = false
  
    if(this.formC.value.nom == "") this.erreurString.push("SVP inserez votre nom")  
    if(this.formC.value.description == "") this.erreurString.push("SVP inserez la description")  
    if(this.restaurant == "") this.erreurString.push("SVP inserez le restaurant")  
   
    if(this.erreurString.length > 0){
      this.isErreurs = true 
      return true
    }
    return false
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



  addProduit(){

    if(this.isLoading){
      return 
    }
    console.log("dddd")
    if (this.chargerErreurs()) {
      return
    }

    this.isLoading = true;

    var allImages = []

    if(!this.multiImage){
      this.envoyerRequest(this.item.image)
      return
    }

    allImages.push({image:this.imageSelectedSource})
   
   
    if(allImages.length > 0){
 
      const formData = new FormData();
      this.isLoading = true
      for (let img of allImages){
        formData.append('myFiles', img.image)
      }
      
      this.http.post(this.informationGenerale.baseUrl+"/plats/upload", formData).subscribe(
        res => {
          
          var arrayImages: any = res
          
          if(arrayImages.length > 0){
            console.log(arrayImages)
            this.imageSelected = arrayImages[0]
            this.envoyerRequest(this.imageSelected)
          }else{
            //alert(this.notificationService.alertNotConnexion)
            this.isLoading = false;
            return 
          }

        }, err => {
          //alert(this.notificationService.alertNotConnexion)
          this.isLoading = false;
          return 
        }
      );

    }

  }

  envoyerRequest(image){
    
    let request:any = this.getRequest(image)
  
    this.http.post(this.informationGenerale.baseUrl+"/plats/modifierPlat/"+this.id, request).subscribe(
      res => {
        //this.notificationService.showSuccess(this.notificationService.sucessProduitEnregistrer, "Message")
        alert("Votre plat est bien enregistrée")
        //this.formC.patchValue({nom: ""});
        //this.formC.body.reset()
        this.fileSources = []
        this.isLoading = false; 
      }, err => {
        //alert(this.notificationService.alertNotConnexion)
        console.log(err)
        this.isLoading = false; 
      }
    );
    
  }

  
  getRequest(image){

    let request = {photo:"",  nom:"", description:"", prix:0, restaurant:""}

    request["photo"] = image
    request["nom"] = this.formC.value.nom
    request["prix"] = this.formC.value.prix
    request["description"] = this.formC.value.description
    request["restaurant"] = this.restaurant
    
    return request
  }

}
