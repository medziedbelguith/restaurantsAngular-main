import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';import { Router } from '@angular/router';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})
export class AddPlatComponent implements OnInit {

  formC:FormGroup

  fileSources = []

  categories = []

  caracteristiques = []

  listCategoriesShema=[]
  listCategories=[]
  listDescriptionsDessous=[]
  listDescriptionsDessus=[]
  
  longDesc

  constructor( private http: HttpClient, private informationGenerale: InformationsService ) { 
    
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

  ngOnInit(): void {
    this.getClients()
  }

  clickRestaurant(id){
    this.restaurant = id
  }

  removeRestaurant(){
    this.restaurant = ""
  }

  isCheked(item){
    return this.restaurant == item.id
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

 
  
  isLoading = false;
  erreurString = []
  isErreurs = false;

  chargerErreurs(){
    this.erreurString = []
    this.isErreurs = false
  
    if(this.formC.value.nom == "") this.erreurString.push("SVP inserez votre nom")  
    if(this.formC.value.description == "") this.erreurString.push("SVP inserez la description")  
    if(!this.multiImage) this.erreurString.push("SVP inserez l'image")  
    if(this.restaurant == "") this.erreurString.push("SVP inserez le restaurant")  
   
    if(this.erreurString.length > 0){
      this.isErreurs = true 
      return true
    }
    return false
  }

  restaurants = []
  getClients() {

    if (this.isLoading) {
      return
    }

    var request = { page:1, limit:10000}

    
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + "/restaurants/listRestaurants", request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.restaurants = resultat.resultat.docs
        } 
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }


  addProduit(){

    if(this.isLoading){
      return 
    }

    if (this.chargerErreurs()) {
      return
    }
  
    this.isLoading = true;

    var allImages = []

    allImages.push({image:this.imageSelectedSource})
   
   
    if(allImages.length > 0){
 
      const formData = new FormData();
      this.isLoading = true
      for (let img of allImages){
        formData.append('myFiles', img.image)
      }
      
      this.http.post(this.informationGenerale.baseUrl+"/restaurants/upload", formData).subscribe(
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

    this.http.post(this.informationGenerale.baseUrl+"/plats/newPlat", request).subscribe(
      res => {
        //this.notificationService.showSuccess(this.notificationService.sucessProduitEnregistrer, "Message")
        alert("Votre plat est bien enregistrée")
        this.formC.patchValue({nom: ""});
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

  restaurant
  
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