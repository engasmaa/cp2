import { Component, OnInit } from '@angular/core';
import { Songs ,Album ,Artist } from 'app/shared/models';
import { SongsService  ,AlbumService ,ArtistService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-musics-list',
  templateUrl: './musics-list.component.html',
  styleUrls: ['./musics-list.component.scss']
})

export class MusicsListComponent implements OnInit {
  SongList:Songs[] = [];
  AlbumList:Album[]=[];
  ArtistList:Artist[]=[];

  song :Songs;
  ArtistID:number=1;
  AlbumId:number;
  AlbumName:string;

  Obj = new Songs();
  i :number=0;
// ----------------------------
  pagenumber=0;

  // -----
term: string;
test:any;
selectedArtisitId :number;
// ****
  constructor(
    private song_service: SongsService ,
    private album_service :AlbumService,
    private artist_srevice :ArtistService,
    private swalService: SwalService,
  ) {}

ngOnInit(): void {
  this.getAllData();
  this.getArtist();

  this.filteredOptions = this.myControl.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filter(value))
  );

}
// ************* start List ******
getAllData(){
  this.song_service.getAll(String( this.pagenumber ),'100').subscribe(res =>{
      this.SongList = res.result;
      // console.log(res.result);
      console.log(res.length);
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
getAlbumsOfAtist(){
  this.album_service.GetAlbumsOfArtist(String(this.pagenumber),'100' ,this.ArtistID).subscribe(res =>{this.AlbumList = res.result;console.log(res.result);})
}
getArtist(){
this.artist_srevice.getAll(String(this.pagenumber) , '100') .subscribe ( res => { this.ArtistList = res.result ;})
}
onArtistChanged(event){
  const value = event.target.value;
  this.ArtistID = value;
  this.getAlbumsOfAtist();
}
// ********  End List ****************

// *************additem **************
onClickSubmit (data ,addOrEdit:number,formName){
this.song=data;

if (addOrEdit ==0 ) // add
{
  // alert("add");

console.log(this.song);

this.song_service.create(this.song).subscribe(res =>{
  this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
  this.getAllData();
}, err => {
  let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
  this.swalService.NotifierError(errorMessage)
 })
}

else if ( addOrEdit ==1 ){
alert(this.Obj.id);
  this.song_service.update( this.Obj.id, this.Obj).subscribe(res =>{
    this.swalService.Notifier(' تم التعديل بنجاح .. شكرا لك ');
    // this.reset();
    this.getAllData();
  }, err => {
    let errorMessage =  err.data || ' حدث خطأ اثناء التعديل  .. من فضلك حاول مرة آخري    ';
    this.swalService.NotifierError(errorMessage)
   })
}
formName.resetForm();
}

// ************ delete **************
delete(index:number ){
  
  // list.findIndex(a=>a.id==id)
  this.i = this.SongList.findIndex(x => x.id === index);

  this.Obj = {...this.SongList[this.i]}
  console.log( this.SongList );
  console.log( this.Obj);
  
  debugger;

  this.swalService.showRemoveConfirmation(this.Obj.title).then(
    result => {
      if (result.value) {
        this. song_service.delete(this.Obj.id).subscribe(
          res => {
            this.swalService.Notifier('تم مسح البيانات بنجاح ');
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

//**************edit ****************
fill(prop: Songs) {
  this.Obj=prop;
  this.ArtistID = this.Obj.album.artistId;
  this.getAlbumsOfAtist();


  console.log(this.Obj);
}

// *************  artist autocomplete ***********
myControl = new FormControl();
filteredOptions: Observable<Artist[]>;


displayFn( user : Artist): string {
  return user && user.name ? user.name : '';
}

newOb :NewArtist[];

private _filter(value: string): Artist[] {
  const filterValue = value.toLowerCase();
  // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  this.artist_srevice.SearchArtist(filterValue).subscribe(
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
  // const value = event.target.value;
  this.ArtistID = selectedValue;
  this.getAlbumsOfAtist();
  // const selectedName = event.option.value;
  // console.log(selectedName);
}

}

 class NewArtist {
  id:number;
  name:string;
}