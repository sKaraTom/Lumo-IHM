
import { Profession } from "./profession";
import { Departement } from "./departement";
import { ProfilPublic } from "./profil-public";

export class ProfilClient {

    public uuid:string;
    public photo:string;
    public nom:string;
    public prenom:string;
    public professions:Profession[];
    public localisation:Departement[];
    public urlSite:string;
    public compteurPopularite:number;

    public listeFavoris:ProfilPublic[];
    public listeVotes:String[];


    

}