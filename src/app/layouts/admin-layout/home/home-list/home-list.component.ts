import { Component, OnInit } from '@angular/core';
import {slider } from 'app/shared/models';
import {sliderService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  sliderList:slider[]=[];
  slider:slider;

  sliderObj = new slider();
  // ****
baseUrl:string= "http://188.225.184.108:9091/";
// ****

//****
imageSrc: string = '';
private Extension :string = '';
private base64 :string[] = [];
base64_header = "data:image/"+this.Extension+";base64,";
ExtensionType:String = '';
//****

  i:number;
  id_edit:number;

  constructor(
    private slider_service :sliderService,
    private swalService: SwalService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.slider_service.getAll().subscribe(res =>{
        this.sliderList = res.result;
        this.sliderList.sort((a,b) =>a.order - b.order);
    })
  } 

// ******* save ***********************
onClickSubmit (data ,addOrEdit:number,formName){
  debugger;
  this.sliderObj=data;
  this.sliderObj.image=this.base64[1];
  this.sliderObj.extension = this.Extension;
  this.sliderObj.title="BG"; 
  this.sliderObj.titleAr="BG"
  this.sliderObj.isActive=true;

  console.log(this.sliderObj.id);

  if (addOrEdit ==0 ) // add
  {
    this.slider_service.create(this.sliderObj).subscribe(res =>{
    this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
    this.getAllData();
  },
   err => {
    let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
    this.swalService.NotifierError(errorMessage)
   })}
  else if ( addOrEdit ==1 ){
    this.sliderObj.id=this.id_edit;

  // console.log(this.sliderObj);

  // this.getBase64(this.sliderObj.image);
  
    this.slider_service.update( this.sliderObj.id, this.sliderObj).subscribe(res =>{
      this.swalService.Notifier(' تم التعديل بنجاح .. شكرا لك ');
      // this.reset();
      this.getAllData();
    }, err => {
      let errorMessage =  err.data || ' حدث خطأ اثناء التعديل  .. من فضلك حاول مرة آخري    ';
      this.swalService.NotifierError(errorMessage)
     })
  }
  
  formName.resetForm();
  this.imageSrc="";
  }
// **************delete***************
delete(id:number ){
  this.i = this.sliderList.findIndex(x => x.id === id);

  this.sliderObj = {...this.sliderList[this.i]}
// debugger;
this.swalService.showRemoveConfirmation(this.sliderObj.id).then(
  result => {
    if (result.value) {
this. slider_service.delete(this.sliderObj.id).subscribe(
  res => {
    this.swalService.Notifier('تم مسح البيانات بنجاح ');
    // this.reset();
    this.getAllData();
  },
  err => {
    let errorMessage = err.message || ' خطآ في مسح البيانات  ';
    this.swalService.NotifierError(errorMessage)
  })
}}
);

}
// **************edit******************
fill(prop: slider) {
  this.sliderObj=prop;
  console.log(this.sliderObj.id);
  this.imageSrc = this.baseUrl+prop.image;
  this.id_edit=this.sliderObj.id;
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
// ***********************************
tt:string;
getBase64(MY_URL){
  debugger;
  // var file = File.createFromFileName("path/to/some/file");

  // let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.tt = reader.result as string;
  //   }

  var request = new XMLHttpRequest();
  request.open('GET', MY_URL, true);
  request.responseType = 'blob';
  request.onload = function() {
      var reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload =  function(e){
          console.log('DataURL:', e.target.result);
      };
  };
  request.send();


}
}


