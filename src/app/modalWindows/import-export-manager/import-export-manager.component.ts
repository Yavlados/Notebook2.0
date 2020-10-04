import { Component, OnInit, ElementRef } from '@angular/core';
import { PgQueryService } from '../../services/pg-query.service';
import { CryptoManagerService } from '../../services/crypto-manager.service';
import * as FileSaver from 'file-saver'

export enum ieManagerStates {
  importMode,
  exportMode
}

@Component({
  selector: 'app-import-export-manager',
  templateUrl: './import-export-manager.component.html',
  styleUrls: ['./import-export-manager.component.scss']
})
export class ImportExportManagerComponent implements OnInit {
  element
  iestate: ieManagerStates
  isWithPassword: boolean = false
  encodingPassword: string = ''

  constructor(private el: ElementRef,
    public pq: PgQueryService) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    this.closeModal()
  }

  closeModal() {
    this.element.style.display = 'none'
  }

  isImportMode() {
    return this.iestate === ieManagerStates.importMode
  }

  isExportMode() {
    return this.iestate === ieManagerStates.exportMode
  }

  isWithPasswordChanged(){
    this.encodingPassword = ''
  }

  onImportAllClicked() {
    const sub = this.pq.importEvents({
        password: this.encodingPassword,
        onImport: 'ALL'
      })
      .subscribe((resp) => {
        console.log(resp)
        if(resp){
          const {data, isSecured} = resp
          let b = new Blob([data])
          const currenTime = new Date()
          const fileName = `${currenTime.getDate()}.${currenTime.getMonth()+1}.${currenTime.getFullYear()} ${currenTime.getHours()}-${currenTime.getMinutes()}-${currenTime.getSeconds()}`
          const extension = isSecured ? `.nbds` : `.nbd`
          FileSaver.saveAs(b, fileName + extension)
        }
        sub.unsubscribe()
      })
  }
}
