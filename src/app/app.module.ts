import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
	import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilMembreComponent } from "./accueil/accueil-membre.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { AnnuaireComponent } from './annuaire/annuaire.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilMembreComponent,
    PageNotFoundComponent,
    AnnuaireComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
