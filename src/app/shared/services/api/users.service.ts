import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { Songs, DataWithRanking, User } from 'app/shared/models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.users;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getAll( offset:string , limit :string): Observable<DataWithRanking< User>> {
    let params = new HttpParams();
    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    return this.http.get<DataWithRanking< User>>(API_URL+`/GetAllUsers` ,{params:params});
  }

  get(id: number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/${id}`);
  }

  update( id: number ,model: User): Observable<DataWithRanking<User>> {
    return this.http.put<DataWithRanking<User>>(API_URL +`/${id}`, model);
  }

  delete(userId): Observable<User>{
    let params = new HttpParams();
    params = params.append('userId' , userId);
    return this.http.delete<User>(API_URL +"/RemoveUser" ,{params:params} );
  }

  updateUserRole(UserId , Admin):Observable<User> {
    debugger;

    // let params = new HttpParams();
    // params = params.append('userId' , UserId);
    // params = params.append('admin' , Admin);
    return this.http.put<User>(API_URL +"/UpdateRole" +`?userId=${UserId}&admin=${Admin}` ,"" );
  }

  updateUserPassword(UserId , password):Observable<User> {
    return this.http.put<User>(API_URL +"/ChangePassword" +`?userId=${UserId}&password=${password}`,"" );
  }


}
