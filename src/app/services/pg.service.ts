import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})
export class PgService {
  backendPort = 3000
  backendHost = 'localhost'
  backendUrl = `http://${this.backendHost}:${this.backendPort}`

  constructor( private http: HttpClient, private router :Router ) { }

  login(loginData:any){
    this.http.post<any>(`${this.backendUrl}/login`,
    loginData, 
    { headers: httpOptions,  responseType: 'json' })
    .pipe(catchError(async (err) => console.log(err)))
    .subscribe( (res) => {
      const { isLogged, msg} = res
      if(isLogged) this.router.navigate(['main'])
    })
  }
}
