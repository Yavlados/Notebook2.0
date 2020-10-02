import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {IEvent} from '../dto/event.dto'
import {IPerson} from '../dto/person.dto'

import { backendUrl } from '../../backend.conf'
import { ITelephone } from '../dto/telephone.dto';
import { IContact } from '../dto/contact.dto';
import { CryptoManagerService } from './crypto-manager.service';

const httpOptions = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})
export class PgQueryService {

  constructor(private http: HttpClient,
    private router :Router,
    public cm : CryptoManagerService) { }

  getAllEvents(){
   return this.http.get<IEvent[]>(`${backendUrl}/get_all_events`)
    .pipe(catchError(async (err) => console.log(err)))
  }

  getPersonsOfEvent(eventId: number) {
    return this.http.post<IPerson[]>(`${backendUrl}/get_event_persons`,
    this.cm.encode({eventId}),
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  getTelephonesOfPerson(personId : number) {
    return this.http.post<ITelephone[]>(`${backendUrl}/get_person_telephones`,
    {personId},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  getTelephoneContacts(telephoneId :number) {
    return this.http.post<IContact[]>(`${backendUrl}/get_telephone_contacts`,
    {telephoneId},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  setUpdatePerson(person :IPerson){
    return this.http.post<IPerson>(`${backendUrl}/set_update_person`,
    {person},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  setAddEvent(event :IEvent){
    return this.http.post<IEvent>(`${backendUrl}/set_add_event`,
    {event},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  setUpdateEvent(event :IEvent){
    return this.http.post<IEvent>(`${backendUrl}/set_update_event`,
    {event},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  setRemoveEvent(event :IEvent){
    return this.http.post<IEvent>(`${backendUrl}/set_remove_event`,
    {event},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }

  importEvents(importData : any){
    return this.http.post<IEvent>(`${backendUrl}/import_events`,
    {importData},
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
  }
}

