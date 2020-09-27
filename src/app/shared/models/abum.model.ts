export class Album {
  constructor(){
    this.isFeatured = false;
  }

  id : number; 
  title :  string ;
  titleAr :  string ;
  image :  string ;
  extension:string;

  artistId:number;
  artist:{
    id:number,
    name:string
  }
  
  languageId:number;
  language:{
    id:number,
    title:string,
    titleAr:string
  }

  albumCategoryId:number;
  albumCategory:{
    id:number,
    title:string
  }

  realeaseDate :  string;
  isFeatured : boolean
}