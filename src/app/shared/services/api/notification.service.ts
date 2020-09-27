import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { DataWithRanking, Notifications } from 'app/shared/models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.notification;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  create(model: Notifications): Observable<Notifications[]> {

    return this.http.post<Notifications[]>(API_URL, model);
  }
 }

 

