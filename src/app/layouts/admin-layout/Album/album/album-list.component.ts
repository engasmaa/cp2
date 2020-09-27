import { Component, OnInit } from '@angular/core';
import { Album , Language , Categories  , Artist ,Songs } from 'app/shared/models';
import { AlbumService, ArtistService , LanguagesService , CategoriesCategoriesService , SongsService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})

export class AlbumListComponent implements OnInit {


AlbumObject:Album;
albumList: Album[]=[];

langList:Language[]=[];
AlbumCatList:Categories[]=[];
ArtistList : Artist[]=[];
SongsList :Songs[] =[];
Songlength:number;

Obj = new Album();

data=[];
pagenumber=0;
pageTitle=1;
// ****
baseUrl:string= "http://188.225.184.108:9091/";
// ****
LangId:number=0;
artistId:number=0;
AlbumCatId:number=0;

Lang:Language =new Language();
artist:Artist;
AlbumCat:Categories;
// ****
imageSrc: string = '';
private Extension :string = '';
private base64 :string[] = [];
ExtensionType:string='';
base64_header = "data:image/"+this.Extension+";base64,";

// ****
term: string;
i:number;
test:any;
selectedArtisitId :number;
// ****
  constructor( private AlbumServices: AlbumService ,
    private LanguagesServices: LanguagesService, 
    private AlbumCategories :CategoriesCategoriesService ,
    private ArtistServices : ArtistService,
    private swalService: SwalService,
    private route: Router,
    private songsService :SongsService
    ) { }

  ngOnInit(): void {
    this.getAllData();
    this.LoadLists();
    // this.getLang();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  getAllData(){
this.AlbumServices.getAll(String(this.pagenumber),'100').subscribe(res =>{
  
    this.data = []
    let a  = (res.result.length /100)+1;
    for (let index = 1; index <= a; index++) {
        this.data.push(index) 
        }
    this.albumList = res.result;

})
  }
  navigate(dir){
  if(dir==1) {
    this.pagenumber= this.pagenumber+100;
    // alert(this.pagenumber);
  }
  else if(dir==2) {
    this.pagenumber= this.pagenumber-100;
  }
  // this.pageTitle = item;
  this.getAllData();
  }
// ******* save ***********************
onClickSubmit (data ,addOrEdit:number,formName){
  

this.AlbumObject=data;
this.AlbumObject.artistId=this.selectedArtisitId;
this.AlbumObject.image=this.base64[1];
this.AlbumObject.extension = this.Extension;
this.AlbumObject.isFeatured=false;
// console.log(this.base64[1]);
// console.log(this.base64[1]);
debugger;
if (addOrEdit ==0 ) // add
{
  // alert("add");

console.log(this.AlbumObject);

this.AlbumServices.create(this.AlbumObject).subscribe(res =>{
  this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
  this.reset();
  this.getAllData();
}, err => {
  let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
  this.swalService.NotifierError(errorMessage)
 })
 
}
else if ( addOrEdit ==1 ){
// alert(this.Obj.id);
console.log(this.AlbumObject);

  this.AlbumServices.update( this.Obj.id, this.AlbumObject).subscribe(res =>{
    this.swalService.Notifier(' تم التعديل بنجاح .. شكرا لك ');
    this.reset();
    this.getAllData();
  }, err => {
    let errorMessage =  err.data || ' حدث خطأ اثناء التعديل  .. من فضلك حاول مرة آخري    ';
    this.swalService.NotifierError(errorMessage)
   })
}

formName.resetForm();
this.imageSrc="";

}

reset(){
  // clear
  // this.AlbumObject.id = 0;
  // this.AlbumObject.title = '';
  // this.AlbumObject.titleAr = '';
  
}
// *******************Get Lists********
getLang(){
  this.LanguagesServices.getAll("0","100").subscribe(
    res=>{this.langList=res.result;  } 
  );
}
getAlbumCategory(){
  this.AlbumCategories.getAll("0","100").subscribe(
    res=>{this.AlbumCatList=res.result; } 
  );
}
getArtists (){
  this.ArtistServices.getAll("0","1000000").subscribe(
    res=>{this.ArtistList=res.result;} 
  );
}
// **************delete***************

delete(id:number ){
  this.i = this.albumList.findIndex(x => x.id === id);

  this.Obj = {...this.albumList[this.i]}
debugger;

  this.songsService.GetSongsOfAlbum('0','100',this.Obj.id).subscribe(res => {
    this.Songlength = res.length;
    if (this.Songlength >0)
  {
    this.swalService.Notifier("من فضلك يوجد اغانى مرتبطه بهذ الالبوم.. قم بحذفها اولا ");
  }
  else {
    this.swalService.showRemoveConfirmation(this.Obj.title).then(
      result => {
        if (result.value) {
          this. AlbumServices.delete(this.Obj.id).subscribe(
            res => {
              this.swalService.Notifier('تم مسح البيانات بنجاح ');
              this.reset();
              this.getAllData();
            },
            err => {
              let errorMessage = err.message || ' خطآ في مسح البيانات  ';
              this.swalService.NotifierError(errorMessage)
            }
          )
        }
      }
    );
}
  })
}
// **************edit******************
fill(prop: Album) {
  
  this.Obj=prop;
  this.imageSrc = this.baseUrl+prop.image;

  console.log( this.imageSrc  );
  console.log(this.Obj);
}
// **************** load lists *******
LoadLists(){
  this.getLang();
  this.getAlbumCategory();
  this.getArtists();
}
// ***********************************
handleInputChange(e) {
  // console.log(this.imageSrc);
  
  var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  var pattern = /image-*/;
  var reader = new FileReader();
  if (!file.type.match(pattern)) {
    alert('invalid format');
    return;
  }
  reader.onload = this._handleReaderLoaded.bind(this);
  reader.readAsDataURL(file);
}
_handleReaderLoaded(e) {
  let reader = e.target;
  this.imageSrc = reader.result;

  this.base64 =this.imageSrc.split(',');

  this.ExtensionType=this.base64[1].substr(0,1);
  
  if (this.ExtensionType == '/'){
    this.Extension="jpg";
  }
  else if (this.ExtensionType =='i'){
    this.Extension="png";
  }
  else if (this.ExtensionType =='R'){
    this.Extension="gif";
  }
  else if (this.ExtensionType =='U'){
    this.Extension="webp";
  }
}

// **************search *******
Search_Term (data){
  console.log( "this.albumList");
    this.AlbumServices.Search(String(0),'100' , data.search).subscribe(res =>{
    this.albumList = res;

    console.log( this.albumList);

    })

}
// ******************************
// search artist in api 
// onSearchChange(searchValue: string): void {  
//   this.ArtistServices.SearchArtist(searchValue).subscribe(
//     res=> {
//       this.ArtistList=res.result;
//     }
//   );
// }


// *************  artist autocomplete ***********

myControl = new FormControl();
filteredOptions: Observable<Artist[]>;

// options: string[] = ['Cash', 'Credit Card', 'Paypal'];
objectOptions=[
  {name:"angular0"},
  {name:"angular1"},
  {name:"angular2"},
  {name:"angular3"},
];

// displayFn(subject){
//   return subject?subject.name :undefined;
// }

displayFn( user : Artist): string {
  return user && user.name ? user.name : '';
}

newOb :NewArtist[];

private _filter(value: string): Artist[] {
  const filterValue = value.toLowerCase();
  // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  this.ArtistServices.SearchArtist(filterValue).subscribe(
    res=> {
      this.ArtistList=res.result;
      // console.log(this.ArtistList );
    },
    error => {
      return  this.ArtistList =[];
    }
  )
return  this.ArtistList;
  // return this.ArtistList.map(x=>x.name  );
}



onShopSelectionChanged(event) {
  const selectedValue = event.option.id;
  this.selectedArtisitId = selectedValue;
  // console.log(selectedValue);
  // const selectedName = event.option.value;
  // console.log(selectedName);
}

}

 class NewArtist {
  id:number;
  name:string;
}