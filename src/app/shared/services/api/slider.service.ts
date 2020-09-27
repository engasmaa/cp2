import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { slider , DataWithRanking } from 'app/shared/models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.Slider;

@Injectable({
  providedIn: 'root'
})
export class sliderService {

  constructor(private http: HttpClient) { }

  
  create(model: slider): Observable<slider> {
    console.log(model);
    return this.http.post<slider>(API_URL, model);
  }

     
  getAll(): Observable<DataWithRanking<slider>> {
  let params = new HttpParams();
  params = params.append('offset' , '0');
  params = params.append('limit' , '100');
  return this.http.get<DataWithRanking<slider>>(API_URL  ,{params:params}  ) }

  get(id: number): Observable<slider> {
    return this.http.get<slider>(API_URL + `/${id}`);
  }

  update( id: number ,model: slider): Observable<DataWithRanking<slider>> {
    // console.log(model);

    return this.http.put<DataWithRanking<slider>>(API_URL +`/${id}`, model);

  }

  delete(id): Observable<slider>{
    return this.http.delete<slider>(API_URL + `/${id}`);
  }

}
