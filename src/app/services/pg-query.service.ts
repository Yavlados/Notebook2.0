import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {IEvent} from '../dto/eventTable.dto'
import { backendUrl } from '../../backend.conf'

@Injectable({
  providedIn: 'root'
})
export class PgQueryService {

  constructor(private http: HttpClient, private router :Router) { }

  getAllEvents(){
   return this.http.get<IEvent[]>(`${backendUrl}/main/get_all_events`)
    .pipe(catchError(async (err) => console.log(err)))
  }
}
