import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilMembreComponent } from "./accueil/accueil-membre.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { AnnuaireComponent } from './annuaire/annuaire.component';
import { PublicationOffreComponent } from './publication-offre/publication-offre.component';

// primeng
import { ChipsModule, DropdownModule, DataTableModule, SharedModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilMembreComponent,
    PageNotFoundComponent,
    AnnuaireComponent,
    PublicationOffreComponent,
  ],
  imports: [
    DataTableModule,SharedModule, // pour tests, à supprimer
    InputTextModule,DropdownModule,ChipsModule,AutoCompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
