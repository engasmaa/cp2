import { Component, OnInit } from '@angular/core';
import { Notifications } from 'app/shared/models';
import { NotificationService } from 'app/shared/services/api/notification.service';
import { SwalService } from 'app/shared/services';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

// main object
  notification: Notifications
  constructor(
    private notificationServices: NotificationService ,
    private swalService :SwalService
  ) { }

  ngOnInit(): void {
    this.notification = new Notifications();
  }
  
  //post
  create(){
    this.notificationServices.create(this.notification).subscribe(
      res=> {
        this.cancel();
        this.swalService.Notifier('تم  الحفظ بنجاح');

      }, err => {
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
  }
  cancel(){
    this.notification.title ='';
    this.notification.body ='';
  }

}
