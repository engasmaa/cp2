import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { Artist, DataWithRanking } from 'app/shared/models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.artists;

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  create(model: Artist): Observable<Artist[]> {
    return this.http.post<Artist[]>(API_URL, model);
  }
     // get Album search
  getAll(offset: string , limit: string  ): Observable<DataWithRanking<Artist>> {
  let params = new HttpParams();
  params = params.append('offset' , offset);
  params = params.append('limit' , limit);
  return this.http.get<DataWithRanking<Artist>>(API_URL  ,{params:params}  ) }

  get(id: number): Observable<Artist> {
    return this.http.get<Artist>(API_URL + `/${id}`);
  }

  update( id: number ,model: Artist): Observable<DataWithRanking<Artist>> {
    return this.http.put<DataWithRanking<Artist>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Artist>{
    return this.http.delete<Artist>(API_URL + `/${id}`);
  }

  SearchArtist( filter :string ) : Observable<DataWithRanking<Artist>> {
    return this.http.get<DataWithRanking<Artist>>(API_URL +"/SearchArtist"+ `?filter=${filter}`);
  }

}
