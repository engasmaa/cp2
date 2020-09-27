import { Component, OnInit } from '@angular/core';

import { Categories } from 'app/shared/models';

import { CategoriesCategoriesService } from 'app/shared/services/api';

import { SwalService } from 'app/shared/services';

@Component({
  selector: 'app-albumcategory-list',
  templateUrl: './albumcategory-list.component.html',
  styleUrls: ['./albumcategory-list.component.scss']
})

export class AlbumcategoryListComponent implements OnInit {

  albumcategory: Categories
  albumcategoryList: Categories[]=[];


  editObj :Categories = new Categories();
  index : number
  data=[];
  pagenumber=0;
  pageTitle=1;
  constructor(
    private albumcategoryServices: CategoriesCategoriesService ,
    private swalService: SwalService
  ){}

  ngOnInit(): void {
    // ini obj
    this.albumcategory = new Categories();
    this.getAllData();
  }

  // get all data of category
  getAllData(){
    this.albumcategoryServices.getAll(String(this.pagenumber),'100').subscribe(res =>{
        this.data = []
        let a  = (res.result.length /100)+1;
        
        for (let index = 1; index <= a; index++) {
           this.data.push(index)    
           }
        this.albumcategoryList = res.result;
    })
  }


   //fill
  fill(prop: Categories) {
    this.albumcategory.id = prop.id;
    this.albumcategory.title = prop.title;
    this.albumcategory.titleAr = prop.titleAr;
}
reset(){
  this.albumcategory.id = 0;
  this.albumcategory.title = '';
  this.albumcategory.titleAr = '';
}
open(){
  this.reset();
}
 save(){
   this.albumcategoryServices.create(this.albumcategory).subscribe(res =>{
   this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
   this.reset();
   this.getAllData();
 }, err => {
   let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
   this.swalService.NotifierError(errorMessage)
  })
 }

 delete( index: number ) {
  this.editObj = {...this.albumcategoryList[index]}
  this.index = index;
   this.swalService.showRemoveConfirmation(index).then(
     result => {
       if (result.value) {
         this.albumcategoryServices.delete(this.editObj.id).subscribe(
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
  this.albumcategoryServices.update( this.albumcategory.id,this.albumcategory).subscribe(
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
