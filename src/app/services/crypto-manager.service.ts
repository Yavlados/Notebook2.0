import { Injectable } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { statusCode } from '../dto/crypto.dto'

import * as aesjs from 'aes-js'
import { backendUrl } from '../../backend.conf';
import { catchError, share } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service'
import { PgQueryService } from './pg-query.service';

const httpOptions = new HttpHeaders()
@Injectable({
  providedIn: 'root'
})
export class CryptoManagerService {
  aes // AES crypto
  updatingTime: number = 600000 //10 minutes
  cryptoService$: Observable<number> = interval(this.updatingTime)
  cryptoServiceSub: Subscription

  constructor(private http: HttpClient,
    private cs: CookieService ) {
      console.log(this.cryptoServiceSub)
    if (! !!this.aes)
      if (this.cs.check('hash')) {
        this.aes = new aesjs.AES(this.passwordToArrayHandler(this.cs.get('hash')))
        if(! !!this.cryptoServiceSub)
          this.cryptoServiceSub = this.cryptoService$.subscribe(_ => this.updateKey())
      }
  }

  upService(uuid: string) {
    this.setKey(uuid)
    if(! !!this.cryptoServiceSub)
      this.cryptoServiceSub = this.cryptoService$.subscribe(_ => this.updateKey())
  }

  updateKey() {

    const sub = this.http.post<any>(`${backendUrl}/crypto_service`,
      { code: statusCode.updateKey },
      { headers: httpOptions, responseType: 'json' })
      .pipe(catchError(async (err) => console.log(err)),
        share())
      .subscribe(res => {
        console.log(res)
        if (res.uuid)
          this.setKey(res.uuid)

        sub.unsubscribe()
      })
  }

  setKey(uuid: string) {
    const slicedKey = uuid.slice(3, 8) + uuid.slice(24, -1)
    this.aes = new aesjs.AES(this.passwordToArrayHandler(slicedKey))   //Have setted key to encoder
    this.cs.set('hash', slicedKey)

    const sub = this.http.post<any>(`${backendUrl}/crypto_service`,
      { code: statusCode.keyIsUpdated },
      { headers: httpOptions, responseType: 'json' })
      .pipe(catchError(async (err) => console.log(err)))
      .subscribe(res => {
        sub.unsubscribe()
      })
  }

  encode(data: any, password = undefined): Uint8Array[] {
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

  decode(data, password = undefined) {
    const isPasswordRight = (data, aes) => {
      const batch = data.slice(0, 16)
      const encryptedBytes = aes.decrypt(batch)
      if (encryptedBytes[0] !== 123 // char {
        && encryptedBytes[0] !== 91 // char [
      ) {
        return false
      }
      return true
    }

    data = this.arraySizeHandler(data)

    if (isPasswordRight(data, this.aes)) {
      let decodingResult = []
      for (let i = 1; i <= (data.length / 16); i++) {
        const batch = data.slice(((i - 1) * 16), (i * 16))
        const encryptedBytes = this.aes.decrypt(batch)
        decodingResult = decodingResult.concat([...encryptedBytes])
      }
      let strResult = (aesjs.utils.utf8.fromBytes(decodingResult)).replace(/\0/g, '')
      let res = JSON.parse(strResult)
      return res
    }
    else return 'Error: Password is wrong'
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
