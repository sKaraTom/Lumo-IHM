
import { Profession } from "./profession";
import { Departement } from "./departement";

export class ProfilPublic {

    public uuid:string;
    public photo:string;
    public nom:string;
    public prenom:string;
    public professions:Profession[];
    public localisation:Departement[];
    public compteurPopularite:number;
    public urlSite:string;

}