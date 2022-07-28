import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantsComponent } from './site/restaurants/restaurants.component';
import { PlatsComponent } from './site/plats/plats.component';
import { ContactComponent } from './site/contact/contact.component';
import { AboutComponent } from './site/about/about.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ListeRestaurantComponent } from './admin/liste-restaurant/liste-restaurant.component';
import { AddRestaurantComponent } from './admin/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './admin/edit-restaurant/edit-restaurant.component';
import { ListPlatsComponent } from './admin/list-plats/list-plats.component';
import { AddPlatComponent } from './admin/add-plat/add-plat.component';
import { EditPlatComponent } from './admin/edit-plat/edit-plat.component';
import { ReservationComponent } from './site/reservation/reservation.component';
import { HomeComponent } from './site/home/home.component';
import { RestaurantMenuComponent } from './site/restaurant-menu/restaurant-menu.component';
import { ListReservationsComponent } from './admin/list-reservations/list-reservations.component';
import { LoginComponent } from './site/login/login.component';


const routes: Routes = [
  {path: '',redirectTo:'accueil',pathMatch:"full"},
 
  {path: 'RestaurantMenu/:id' , component: RestaurantMenuComponent },
 
  {path: 'login' , component: LoginComponent },
 
  {path: 'Restaurants' , component: RestaurantsComponent },
  {path: 'Plats' , component: PlatsComponent },
  {path: 'Contact' , component: ContactComponent },
  {path: 'About' , component: AboutComponent },
  {path: 'ListeRestaurant' , component: ListeRestaurantComponent },
  {path: 'ListeReservations' , component: ListReservationsComponent },
  {path: 'AddRestaurant' , component: AddRestaurantComponent },
  {path: 'EditRestaurant/:id' , component: EditRestaurantComponent },
  {path: 'EditPlat/:id' , component: EditPlatComponent },
  {path: 'ListPlats' , component: ListPlatsComponent },
  {path: 'AddPlat' , component: AddPlatComponent },
  {path: 'EditPlat' , component: EditPlatComponent },
  {path: 'Reservation' , component: ReservationComponent },
  {path: 'accueil' , component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
