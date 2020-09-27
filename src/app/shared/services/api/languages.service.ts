import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language, DataWithRanking } from 'app/shared/models';


const API_URL = END_POINTS.languages;

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) { }

  create(model: Language): Observable<Language[]> {
    return this.http.post<Language[]>(API_URL, model);
  }
 
     // get Album search
     getAll(offset: string , limit: string  ): Observable<DataWithRanking<Language>> {
      let params = new HttpParams();
      params = params.append('offset' , offset);
      params = params.append('limit' , limit);
      return this.http.get<DataWithRanking<Language>>(API_URL  ,{params:params}  ) }
    

     get(id: number): Observable<Language> {
     return this.http.get<Language>(API_URL + `/${id}`);
     }

    update( id: number ,model: Language): Observable<Language> {
    return this.http.put<Language>(API_URL +`/${id}`, model);
    }
    
    delete(id): Observable<Language>{
    return this.http.delete<Language>(API_URL + `/${id}`);
    }
}
