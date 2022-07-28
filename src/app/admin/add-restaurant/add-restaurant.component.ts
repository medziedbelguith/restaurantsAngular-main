import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';import { Router } from '@angular/router';
import { InformationsService } from '../../services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

 
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
      telephone:new FormControl('',[Validators.required, Validators.min(1)]),
      adresse:new FormControl('',[Validators.required, Validators.min(1)]),
      specialites:new FormControl('',[Validators.required, Validators.min(1)]),
      description:new FormControl('',[Validators.required, Validators.min(1)]),
      email:new FormControl('',[Validators.required, Validators.min(1)]),
    
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
    if(this.formC.value.adresse == "") this.erreurString.push("SVP inserez votre adresse")  
    if(this.formC.value.telephone == "") this.erreurString.push("SVP inserez votre telephone")  
    if(this.formC.value.email == "") this.erreurString.push("SVP inserez l'email")  
    if(this.formC.value.description == "") this.erreurString.push("SVP inserez la description")  
    if(this.formC.value.specialites == "") this.erreurString.push("SVP inserez les specialites")  
    if(!this.multiImage) this.erreurString.push("SVP inserez l'image")  
    
    if(this.erreurString.length > 0){
      this.isErreurs = true 
      return true
    }
    return false
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

   

    this.http.post(this.informationGenerale.baseUrl+"/restaurants/newRestaurant", request).subscribe(
      res => {
        //this.notificationService.showSuccess(this.notificationService.sucessProduitEnregistrer, "Message")
        alert("Votre restaurant est bien enregistrée")
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

  
  getRequest(image){

    let request = {image:"",  nom:"", description:"", specialites:"", adresse:"", telephone:"", email:""}

    request["image"] = image
    request["email"] = this.formC.value.email
    request["nom"] = this.formC.value.nom
    request["description"] = this.formC.value.description
    request["specialites"] = this.formC.value.specialites
    request["adresse"] = this.formC.value.adresse
    request["telephone"] = this.formC.value.telephone
    
    return request
  }

}