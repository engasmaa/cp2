import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categories, DataWithRanking } from 'app/shared/models';

const API_URL = END_POINTS.albumCategories;


@Injectable({
  providedIn: 'root'
})
export class CategoriesCategoriesService {

  constructor(private http: HttpClient) { }

  create(model: Categories): Observable<Categories[]> {
    return this.http.post<Categories[]>(API_URL, model);
  }
    // get Categories search
    getAll(offset: string , limit: string  ): Observable<DataWithRanking<Categories>> {
      let params = new HttpParams();
      params = params.append('offset' , offset);
      params = params.append('limit' , limit);
     return this.http.get<DataWithRanking<Categories>>(API_URL  ,{params:params}  ) }

  
  get(id: number): Observable<Categories> {
    return this.http.get<Categories>(API_URL + `/${id}`);
  }

  update( id: number ,model: Categories): Observable<DataWithRanking<Categories>> {
    return this.http.put<DataWithRanking<Categories>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Categories>{
    return this.http.delete<Categories>(API_URL + `/${id}`);
  }}
