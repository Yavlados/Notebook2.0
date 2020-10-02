import { Injectable } from '@angular/core'
import * as aesjs from 'aes-js'
import { ImportExportManagerComponent, ieManagerStates } from '../modalWindows/import-export-manager/import-export-manager.component'

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  component : ImportExportManagerComponent
  constructor() { }

  openExport() {
    // this.component.editablePerson = {...emptyPerson, telephones:[]}
    this.component.iestate = ieManagerStates.exportMode
    this.component.element.style.display = 'block'
  }

  openImport() {
    // this.component.editablePerson = {...emptyPerson, telephones:[]}
    this.component.iestate = ieManagerStates.importMode
    this.component.element.style.display = 'block'
  }

  // private passwordToArrayHandler = (password) => {
  //   const encoder = new TextEncoder()
  //   console.log(encoder.encoding)
  //   const password_array = new Uint8Array(16)
  //   encoder.encodeInto(password, password_array)
  //   return password_array
  // }

  // private arraySizeHandler = (data_array) => {
  //   if (data_array.length % 16 !== 0) {
  //     const lengthOfZeros = ((~~(data_array.length / 16)) + 1) * 16 - data_array.length
  //     const additionalArray = new Array(lengthOfZeros).fill(0)
  //     data_array = data_array.concat([...additionalArray])
  //   }
  //   return data_array
  // }


  // encoding = (data, password) => {
  //   const password_array = this.passwordToArrayHandler(password)

  //   const aes = new aesjs.AES(password_array)

  //   const data_string = JSON.stringify(data)
  //   let data_array = Array.from(aesjs.utils.utf8.toBytes(data_string))

  //   data_array = this.arraySizeHandler(data_array)

  //   let encoding_Result = []
  //   for (let i = 1; i <= (data_array.length / 16); i++) {
  //     const batch = data_array.slice(((i - 1) * 16), (i * 16))
  //     const encryptedBytes = aes.encrypt(batch)
  //     encoding_Result = encoding_Result.concat([...encryptedBytes])
  //   }
  //   debugger
  //   return encoding_Result
  // }
}
