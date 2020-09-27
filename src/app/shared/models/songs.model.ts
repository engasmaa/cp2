import { title } from "process";

export class Songs {
       id   : number;
       title   :    string   ;
       titleAr   :    string   ;
       lowQuality   :    string  ;
       // highQuality   :    string  ;

       albumId   : number;

       album :{
              id:number ,
              title:string,
              artistId:number
       };
}