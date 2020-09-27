import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { AuthenticationService } from '../Auth';
import { SwalService } from '../swal.service';

const API_URL = END_POINTS.login;


export class UserLogin{
  username: string; 
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService ,
    private swalService: SwalService,
    ) { }

  login(user: UserLogin) {
    return this.http.post(API_URL, user).pipe(
      tap(
        res => {
          localStorage.setItem('token', String(res));

        },
        err =>{
          if(err[Object.keys(err)[0]] == 400){
            this.swalService.NotifierError('من فضلك ادخل الحقول الممطلوبة')  


          } else {
            this.swalService.NotifierError(' اسم المستخدم او كلمه المرور غير صحيحة   ')  

          }
     


        }
        
      )
    );
  }

}
