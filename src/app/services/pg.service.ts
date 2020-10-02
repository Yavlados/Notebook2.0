import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {backendUrl} from '../../backend.conf'
import { IContact } from '../dto/contact.dto';
import { ITelephone } from '../dto/telephone.dto';
import { IEvent } from '../dto/event.dto';
import { IPerson } from '../dto/person.dto';
import { CryptoManagerService } from './crypto-manager.service';

const httpOptions = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})
export class PgService {

  loginState = false

  constructor( private http: HttpClient,
    private router :Router,
    public cm : CryptoManagerService) { }

  login(loginData:any){
    this.http.post<any>(`${backendUrl}/login`,
    loginData,
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
    .subscribe( (res) => {
      console.log(res)
      const { isLogged, uuid} = res

      if(isLogged && uuid) {
        this.cm.upService(uuid)
        this.loginState = true

        this.router.navigate(['main'])
      }
    })
  }

  trimManager( resObj: any) : any {
    Object.keys(resObj).map( key => {
      if(!! resObj[key] && typeof resObj[key] === 'string')
      resObj[key] = resObj[key].trim()
    })
    return resObj
  }
}
