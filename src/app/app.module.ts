import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { SliderComponent } from './shared/slider/slider.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { RestaurantMenuComponent } from './site/restaurant-menu/restaurant-menu.component';
import { ListReservationsComponent } from './admin/list-reservations/list-reservations.component';
import { LoginComponent } from './site/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    PlatsComponent,
    ContactComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    ListeRestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    ListPlatsComponent,
    AddPlatComponent,
    EditPlatComponent,
    ReservationComponent,
    HomeComponent,
    SliderComponent,
    SidebarComponent,
    PaginationComponent,
    DeleteModalComponent,
    RestaurantMenuComponent,
    ListReservationsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
