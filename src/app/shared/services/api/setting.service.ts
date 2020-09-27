import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';

import { Songs, DataWithRanking ,setting} from 'app/shared/models';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const API_URL = END_POINTS.setting;

@Injectable({
  providedIn: 'root'
})


export class SettingService {

  constructor( private http: HttpClient )   { }

  getAll( offset :string , limit :string  ) : Observable<DataWithRanking<setting>>  {
    let params = new HttpParams();
    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    return this.http.get<DataWithRanking<setting>>(API_URL , {params:params});
  }

  Edit(id:number ,model:setting ) : Observable<DataWithRanking <setting>> {
    console.log(model);
    return this.http.put<DataWithRanking <setting>>(API_URL+`/${id}`, model);
  }
}
