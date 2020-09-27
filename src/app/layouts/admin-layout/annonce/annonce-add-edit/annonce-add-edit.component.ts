import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Annonce } from 'app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'app/shared/services';
import { AnnonceService } from 'app/shared/services/api';


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-annonce-add-edit',
  templateUrl: './annonce-add-edit.component.html',
  styleUrls: ['./annonce-add-edit.component.scss']
})
export class AnnonceAddEditComponent implements OnInit {





  @ViewChild('SlideImg', { static: false }) SlideImg: ElementRef;

 //main object
 annonce:Annonce;
 //list
 annonceList : Annonce[] = [];

 isAdd: boolean;
 formSubmitted: boolean = false;

 isBusy: boolean = false;

 index : number
 editObj :Annonce = new Annonce();

 image: string;

 //chang image flag
 isChangeImage : boolean = false;

 isEdit : boolean = false;
 

 updateimg: boolean =true;
 toupdate: boolean = false;
 apearButton: boolean = true;
 ResetButton: boolean = false;

  constructor( private route: ActivatedRoute,
    private renderer2: Renderer2,
    private swalService: SwalService,
    private annonceServices: AnnonceService ,
    private router: Router,) { }

  ngOnInit(): void {

    //ini object
    this.annonce = new Annonce();

    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.annonce.id = this.route.snapshot.params.id;
      this.getSlide(this.annonce.id)
      this.isAdd = false
    }
  }



  getSlide(id) {
    this.annonceServices.get(id).subscribe(res => {
       this.annonce = res;
       this.annonce.image = 'http://188.225.184.108:9091/'+res.image;
      this.changebackground( this.SlideImg , 'UserImageURL')


    })
  }

  save(...args: boolean[]) {
    this.formSubmitted = true;
    let a;
    args.map(item => {
      if (item === true) {
        a = true
        this.swalService.NotifierError('قم بادخال الحقول المطلوبه');
      }
    })
    if (a) return

    if (this.isAdd) {
      this.isBusy = true
      this.annonceServices.create(this.annonce).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        // this.router.navigate([`./pages/home/list`])
this.reset()
      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.isChangeImage?this.annonce.image = this.annonce.image:this.annonce.image = null;
      this.annonceServices.update(this.annonce.id , this.annonce).subscribe(res => {
        this.isBusy = false;
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        // this.router.navigate([`./pages/home/list`])
        this.reset()

      }, err => {
        this.isBusy = false;
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })

    }
  }
  onFileChanged(event: HTMLInputEvent ,  prop: string) {
    this.isChangeImage = true;
    const file = event.target.files[0];
    let el = event.target.parentNode as HTMLElement;
    this.renderer2.removeClass(el, 'services-image')
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
     this.annonce.image = reader.result as string;
     this.annonce.image = this.annonce.image.split(',')[1];
     
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.annonce.image})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')

    }
  }
  
  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
        this.annonce[clsProp] = "Deleted"
        return
      } 
    }
    if (this.annonce[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.annonce.image}')`);
        this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    this.renderer2.removeClass(el.nativeElement, 'services-image')
  }

  reset(){
    this.annonce.id =   0  ;
    this.annonce.title  =   ''    ;
    this.annonce.titleAr  =   ''    ;
    this.annonce.image  =   ''    ;
    this.annonce.url  =   ''    ;
    this.annonce.extension  =   ''    ;
    this.annonce.position  =''      ;
    this.annonce.order  =   0;

  }
  cancel(){
    this.reset();

  }
}
