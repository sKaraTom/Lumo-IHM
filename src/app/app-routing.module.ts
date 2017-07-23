import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { AccueilMembreComponent } from "./accueil/accueil-membre.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AnnuaireComponent } from "./annuaire/annuaire.component";

const appRoutes: Routes = [

  { path: 'accueil', component: AccueilMembreComponent },
  { path: 'annuaire', component: AnnuaireComponent },  
  
  { path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
  ];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
      ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }