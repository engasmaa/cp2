import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'app/shared/models';
import { ArtistService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';

@Component({
  selector: 'app-stars-list',
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.scss']
})
export class StarsListComponent implements OnInit {

// main object
artist:Artist;

//array list 
artistList: Artist[]=[];


isEdit : boolean = false;
index : number
editObj :Artist = new Artist();
formSubmitted: boolean= false;
data=[];
pagenumber=0;
pageTitle=1;
  constructor(private artistServoces: ArtistService ,
    private swalService: SwalService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getAllData();

  }


  // get all data of annonce
  getAllData(){
    this.artistServoces.getAll(String(this.pagenumber),'100').subscribe(res =>{
        this.data = []
        let a  = (res.result.length /100)+1;
        
        for (let index = 1; index <= a; index++) {
           this.data.push(index) 
        
          
        }
        this.artistList = res.result.map(item =>{
        item.image = 'http://188.225.184.108:9091/'+item.image
        return item
      })
      
    })

  }
  // navigate(item){
  //   this.pagenumber= item -1
  //   this.pageTitle = item;
  //   this.getAllData();
  // }

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

  delete(  index: number ) {
    this.editObj = {...this.artistList[index]}
    this.index = index;
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.artistServoces.delete(this.editObj.id).subscribe(
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
    this.route.navigate([`./pages/stars/edit/${id}`], { queryParams: { isAdd: false } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/stars/edit/false`], { queryParams: { isAdd: true } })
  }

}
