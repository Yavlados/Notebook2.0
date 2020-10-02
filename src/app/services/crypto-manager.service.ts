import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { statusCode } from '../dto/crypto.dto'

import * as aesjs from 'aes-js'
import { backendUrl } from '../../backend.conf';
import { catchError } from 'rxjs/operators';

const httpOptions = new HttpHeaders()
@Injectable({
  providedIn: 'root'
})
export class CryptoManagerService {
  aes                         // AES crypto
  updatingTime: number = 600000 //10 minutes
  cryptoService: Observable<number> = interval(this.updatingTime)

  constructor(private http: HttpClient) { }

  upService(uuid: string) {
    this.setKey(uuid)
    this.cryptoService.subscribe(_ => this.updateKey())
  }

  updateKey() {
    this.http.post<any>(`${backendUrl}/crypto_service`,
      { code: statusCode.updateKey },
      { headers: httpOptions, responseType: 'json' })
      .pipe(catchError(async (err) => console.log(err)))
      .subscribe(res =>{
        console.log(res)
        if(res.uuid)
          this.setKey(res.uuid)
      })
  }

  setKey(uuid: string) {
    const slicedKey = uuid.slice(3, 8) + uuid.slice(24, -1)
    this.aes = new aesjs.AES(this.passwordToArrayHandler(slicedKey))   //Have setted key to encoder

    this.http.post<any>(`${backendUrl}/crypto_service`,
      { code: statusCode.keyIsUpdated },
      { headers: httpOptions, responseType: 'json' })
      .pipe(catchError(async (err) => console.log(err)))
      .subscribe(res =>{
      } )
  }

  encode(data: any, password = undefined) {
    const data_string = JSON.stringify(data)
    let data_array = Array.from(aesjs.utils.utf8.toBytes(data_string))

    data_array = this.arraySizeHandler(data_array)
    let encoding_Result = []
    for (let i = 1; i <= (data_array.length / 16); i++) {
      const batch = data_array.slice(((i - 1) * 16), (i * 16))
      const encryptedBytes = this.aes.encrypt(batch)
      encoding_Result = encoding_Result.concat([...encryptedBytes])
    }
    return encoding_Result
  }

  private arraySizeHandler = (data_array) => {
    if (data_array.length % 16 !== 0) {
      const lengthOfZeros = ((~~(data_array.length / 16)) + 1) * 16 - data_array.length
      const additionalArray = new Array(lengthOfZeros).fill(0)
      data_array = data_array.concat([...additionalArray])
    }
    return data_array
  }

  private passwordToArrayHandler = (password) => {
    const encoder: TextEncoder = new TextEncoder()
    const password_array = new Uint8Array(16)
    encoder.encodeInto(password, password_array)
    return password_array
  }

}
