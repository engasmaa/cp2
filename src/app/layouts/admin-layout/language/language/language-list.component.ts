import { Component, OnInit } from '@angular/core';
import { Language } from 'app/shared/models';
import { LanguagesService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss']
})
export class LanguageListComponent implements OnInit {

  //MAIN-OBJECT
    language: Language;
    languageList: Language[]=[];

    
  editObj :Language = new Language();
  index : number
  data=[];
  pagenumber=0;
  pageTitle=1;

  constructor( private languageServices: LanguagesService ,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.language = new Language();

    this.getAllData();
  }
 // get all data of category
 getAllData(){
  this.languageServices.getAll(String(this.pagenumber),'100').subscribe(res =>{
      this.data = []
      let a  = (res.result.length /100)+1;
      for (let index = 1; index <= a; index++) {
         this.data.push(index)     }
      this.languageList = res.result;
  })

}


 //fill
 fill(prop: Language) {
  this.language.id = prop.id;
  this.language.title = prop.title;
  this.language.titleAr = prop.titleAr;

}
reset(){
this.language.id = 0;
this.language.title = '';
this.language.titleAr = '';

}
open(){
this.reset();
}
save(){

this.languageServices.create(this.language).subscribe(res =>{
 this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
 this.reset();
 this.getAllData();

}, err => {
 let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
 this.swalService.NotifierError(errorMessage)
})
}

delete( index: number ) {
this.editObj = {...this.languageList[index]}
this.index = index;
 this.swalService.showRemoveConfirmation(index).then(
   result => {
     if (result.value) {
       this.languageServices.delete(this.editObj.id).subscribe(
     
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

saveupdate(){
this.update();
}

update( ) {
this.languageServices.update( this.language.id,this.language).subscribe(
  res => {
    this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
     this.reset();
    this.getAllData();
  },
  err => {
    let errorMessage = err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
    this.swalService.NotifierError(errorMessage)

  }
)
}
cancel(){
this.reset();

}

}
