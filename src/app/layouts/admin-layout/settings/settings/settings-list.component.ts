import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setting } from 'app/shared/models';
import { SettingService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {
  settingObj= new setting();
  phone:string;
  mail:string;

  phone_id :number;
  mail_id :number;

  constructor( private router: Router , 
    private setting_service :SettingService ,
    private swalService: SwalService,
    ) { }

  settinglist:setting []=[];

  ngOnInit(): void {
      this.getAllData();
  }
  // ********** get 
  getAllData(){
    this.setting_service.getAll(String(0),'100').subscribe(res =>{
        this.settinglist = res.result;
        // console.log(this.settinglist);
        var phone_val= this.settinglist.find(x=>x.name=="phone");
        var mail_val= this.settinglist.find(x=>x.name=="mail");

        this.phone=phone_val["value"];
        this.phone_id=phone_val["id"];
        this.mail=mail_val["value"];
        this.mail_id=mail_val["id"];

    })
  }
  // **********
  home(){
    this.router.navigate(['/pages/home']);
  }

  onClickSubmit (data ,addOrEdit:number,formName){
    this.settingObj = data;
    console.log( this.settingObj);

    this.settingObj.name="phone";
    this.settingObj.value =data.phone;

    this.setting_service.Edit(this.phone_id ,this.settingObj).subscribe( res => {

          this.settingObj.name="mail";
          this.settingObj.value =data.mail;
          this.setting_service.Edit(this.mail_id ,this.settingObj).subscribe( res => {
            this.swalService.Notifier(' تم التعديل بنجاح .. شكرا لك ');
            this.getAllData();
          })

    }, err => {
      let errorMessage =  err.data || ' حدث خطأ اثناء التعديل  .. من فضلك حاول مرة آخري    ';
      this.swalService.NotifierError(errorMessage)
    });
  }
}
