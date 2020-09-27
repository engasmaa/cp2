import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Annonce, Artist } from 'app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'app/shared/services';
import {  ArtistService } from 'app/shared/services/api';



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-stars-add-edit',
  templateUrl: './stars-add-edit.component.html',
  styleUrls: ['./stars-add-edit.component.scss']
})
export class StarsAddEditComponent implements OnInit {





  @ViewChild('SlideImg', { static: false }) SlideImg: ElementRef;

 //main object
 artist:Artist;
 //list
 artistList : Artist[] = [];

 isAdd: boolean;
 formSubmitted: boolean = false;

 isBusy: boolean = false;

 index : number
 editObj :Artist = new Artist();

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
    private artistServices: ArtistService ,
    private router: Router,) { }

  ngOnInit(): void {

    //ini object
    this.artist = new Artist();

    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.artist.id = this.route.snapshot.params.id;
      this.getSlide(this.artist.id)
      this.isAdd = false
    }
  }



  getSlide(id) {
    this.artistServices.get(id).subscribe(res => {
       this.artist = res;
       this.artist.image = 'http://188.225.184.108:9091/'+res.image;
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
      this.artistServices.create(this.artist).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.reset()
        this.formSubmitted = false;
        // this.router.navigate([`./pages/home/list`])

      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.isChangeImage?this.artist.image = this.artist.image:this.artist.image = null;
      this.artistServices.update(this.artist.id , this.artist).subscribe(res => {
        this.isBusy = false;
        this.reset()
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        // this.router.navigate([`./pages/home/list`])

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
     this.artist.image = reader.result as string;
     this.artist.image = this.artist.image.split(',')[1];
     
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.artist.image})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')

    }
  }
  
  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
        this.artist[clsProp] = "Deleted"
        return
      } 
    }
    if (this.artist[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.artist.image}')`);
        this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    this.renderer2.removeClass(el.nativeElement, 'services-image')
  }

  reset(){
    this.artist.id =0;
    this.artist.extension='';
    this.artist.name =''  ;
    this.artist.nameAr = ''  ;
    this.artist.image =''  ;
  }
  cancel(){
    this.reset()
  }

  // navigateToEdit(id: number) {
  //   this.route.navigate([`./pages/stars/list`])
  // }

 
}
