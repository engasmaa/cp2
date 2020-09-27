import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Annonce, Album } from 'app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'app/shared/services';
import { AnnonceService, AlbumService } from 'app/shared/services/api';


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-album-add-edit',
  templateUrl: './album-add-edit.component.html',
  styleUrls: ['./album-add-edit.component.scss']
})
export class AlbumAddEditComponent implements OnInit {





  @ViewChild('SlideImg', { static: false }) SlideImg: ElementRef;

 //main object
 album:Album;
 //list
 albumList : Album[] = [];

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
    private albumServices: AlbumService,
    private router: Router,) { }

  ngOnInit(): void {

    //ini object
    this.album = new Album();

    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.album.id = this.route.snapshot.params.id;
      this.getSlide(this.album.id)
      this.isAdd = false
    }
  }



  getSlide(id) {
    this.albumServices.get(id).subscribe(res => {
       this.album = res;
       this.album.image = 'http://188.225.184.108:9091/'+res.image;
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
      this.albumServices.create(this.album).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        // this.router.navigate([`./pages/home/list`])

      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.isChangeImage?this.album.image = this.album.image:this.album.image = null;
      this.albumServices.update(this.album.id , this.album).subscribe(res => {
        this.isBusy = false;
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
     this.album.image = reader.result as string;
     this.album.image = this.album.image.split(',')[1];
     
     this.renderer2.setStyle(el,
      'background-image', `url(${reader.result ? reader.result : this.album.image})`)
    this.renderer2.setStyle(el, 'background-size', 'cover')
    this.renderer2.setStyle(el, 'background-position', 'center')
    this.renderer2.setStyle(el, 'border', '3px solid black')

    }
  }
  
  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/img/user-image.png)`)
        this.album[clsProp] = "Deleted"
        return
      } 
    }
    if (this.album[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.album.image}')`);
        this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    this.renderer2.removeClass(el.nativeElement, 'services-image')
  }
}
