import { Component, OnInit } from '@angular/core';
import { Annonce } from 'app/shared/models';
import { AnnonceService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit {

// main object
  annonce:Annonce;

  //array list 
  annonceList: Annonce[]=[];


  isEdit : boolean = false;
  index : number
  editObj :Annonce = new Annonce();
  formSubmitted: boolean= false;
  data=[];
  pagenumber=0;
  pageTitle=1;
  constructor( private annonceServices: AnnonceService ,
    private swalService: SwalService,
    private route: Router,

    ) { }

  ngOnInit(): void {
    this.getAllData();
  }



// get all data of annonce
  getAllData(){
    this.annonceServices.getAll(String(this.pagenumber),'100').subscribe(res =>{
        this.data = []
        let a  = (res.result.length /100)+1;
        
        for (let index = 1; index <= a; index++) {
           this.data.push(index) 
        
          
        }
        console.log(this.data)
        this.annonceList = res.result.map(item =>{
        item.image = 'http://188.225.184.108:9091/'+item.image
        return item
      })
      
    })

  }
  navigate(item){
    this.pagenumber= item -1
    this.pageTitle = item;
    this.getAllData();
  }

  delete(  index: number ) {
    this.editObj = {...this.annonceList[index]}
    this.index = index;
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.annonceServices.delete(this.editObj.id).subscribe(
            res => {
              this.swalService.Notifier('Done ');
              this.getAllData();

            },
            err => {
              let errorMessage = err.message || ' Error  ';
              this.swalService.NotifierError(errorMessage)
            }
          )
        }
      }
    );
  }
  


  navigateToEdit(id: number) {
    this.route.navigate([`./pages/annonce/edit/${id}`], { queryParams: { isAdd: false } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/annonce/edit/false`], { queryParams: { isAdd: true } })
  }
  cancel(){
    this.annonce.id =  0  ;
    this.annonce.title =  ''  ;
    this.annonce.titleAr =  ''  ;
    this.annonce.image =  '' ;
    this.annonce.extension =  ''  ;
    this.annonce.url =  ''  ;
    this.annonce.position =  ''  ;
    this.annonce.order =  0  ;
  }
}
