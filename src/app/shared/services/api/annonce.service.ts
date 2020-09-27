import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  DataWithRanking, Annonce } from 'app/shared/models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.annonce;

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  constructor(private http: HttpClient) { }


  create(model: Annonce): Observable<Annonce[]> {
    return this.http.post<Annonce[]>(API_URL, model);
  }
 


   // get Album search
   getAll(offset: string , limit: string  ): Observable<DataWithRanking<Annonce>> {
   let params = new HttpParams();
   params = params.append('offset' , offset);
   params = params.append('limit' , limit);
  return this.http.get<DataWithRanking<Annonce>>(API_URL  ,{params:params}  ) }

  
  get(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(API_URL + `/${id}`);
  }

  update( id: number ,model: Annonce): Observable<DataWithRanking<Annonce>> {
    return this.http.put<DataWithRanking<Annonce>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Annonce>{
    return this.http.delete<Annonce>(API_URL + `/${id}`);
  }
}
