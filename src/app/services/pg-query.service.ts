import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {IEvent} from '../dto/event.dto'
import {IPerson} from '../dto/person.dto'

import { backendUrl } from '../../backend.conf'
import { ITelephone } from '../dto/telephone.dto';
import { IContact } from '../dto/contact.dto';

const httpOptions = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})
export class PgQueryService {

  constructor(private http: HttpClient, private router :Router) { }

  getAllEvents(){
   return this.http.get<IEvent[]>(`${backendUrl}/main/get_all_events`)
    .pipe(catchError(async (err) => console.log(err)))
  }

  getPersonsOfEvent(eventId: number) {
    return this.http.post<IPerson[]>(`${backendUrl}/main/get_event_persons`,
    {eventId},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  getTelephonesOfPerson(personId : number) {
    return this.http.post<ITelephone[]>(`${backendUrl}/main/get_person_telephones`,
    {personId},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  getTelephoneContacts(telephoneId :number) {
    return this.http.post<IContact[]>(`${backendUrl}/main/get_telephone_contacts`,
    {telephoneId},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  setUpdatePerson(person :IPerson){
    return this.http.post<IPerson>(`${backendUrl}/main/set_update_person`,
    {person},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }
}

