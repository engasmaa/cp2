import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { Album, DataWithRanking, Artist } from 'app/shared/models';
import { Observable } from 'rxjs';


const API_URL = END_POINTS.albums;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  create(model: Album): Observable<Album[]> {
    return this.http.post<Album[]>(API_URL, model);
  }
    // get Album search
  getAll(offset: string , limit: string  ): Observable<DataWithRanking<Album>> {
    let params = new HttpParams();
    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    return this.http.get<DataWithRanking<Album>>(API_URL  ,{params:params}  )
    }

  get(id: number): Observable<Album> {
  return this.http.get<Album>(API_URL + `/${id}`);
  }

   update( id: number ,model: Album): Observable<DataWithRanking<Album>> {
    return this.http.put<DataWithRanking<Album>>(API_URL +`/${id}`, model);
  }
  
  delete(id): Observable<Album>{
    return this.http.delete<Album>(API_URL + `/${id}`);
  }


  Search(offset: string , limit: string , Term:string): Observable<Album[]>{
    let params = new HttpParams();
    params = params.append('offset' , offset);
    params = params.append('limit' , limit);

    return this.http.get<Album[]>(API_URL , {params:params} );
  }

  GetAlbumsOfArtist(offset: string , limit: string ,id:number):Observable<DataWithRanking<Album>> {
    
    let params = new HttpParams();

    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    params = params.append( 'artist' ,id.toString());

    return this.http.get<DataWithRanking<Album>>("http://188.225.184.108:9091/api/albums/GetAlbumsOfArtist" ,{params:params}  );
  }


 

}
