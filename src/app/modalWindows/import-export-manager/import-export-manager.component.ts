import { Component, OnInit, ElementRef } from '@angular/core'
import { PgQueryService } from '../../services/pg-services/pg-query.service'
import { CryptoManagerService } from '../../services/crypto-manager.service'
import * as FileSaver from 'file-saver'
import { AlertManagerService } from '../../services/window-managers/alert-manager.service'

export enum ieManagerStates {
  importMode,
  exportMode,
}

@Component({
  selector: 'app-import-export-manager',
  templateUrl: './import-export-manager.component.html',
  styleUrls: ['./import-export-manager.component.scss'],
})
export class ImportExportManagerComponent implements OnInit {
  element
  iestate: ieManagerStates
  isWithPassword: boolean = false
  encodingPassword: string = ''
  filetoUpload: File | undefined

  constructor(
    private el: ElementRef,
    public pq: PgQueryService,
    public cm: CryptoManagerService,
    public alert: AlertManagerService
  ) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    this.closeModal()
  }

  closeModal() {
    this.element.style.display = 'none'
    this.isWithPassword = false
    this.encodingPassword = ''
    this.filetoUpload = undefined
  }

  isImportMode() {
    return this.iestate === ieManagerStates.importMode
  }

  isExportMode() {
    return this.iestate === ieManagerStates.exportMode
  }

  isWithPasswordChanged() {
    this.encodingPassword = ''
  }

  onImportAllClicked() {
    const sub = this.pq
      .importEvents({
        password: this.encodingPassword,
        onImport: 'ALL',
      })
      .subscribe((resp) => {
        console.log(resp)
        if (resp) {
          const { data, isSecured } = resp
          let b = new Blob([data], {
            type: 'octet/stream',
          })
          const currenTime = new Date()
          const fileName = `${currenTime.getDate()}.${
            currenTime.getMonth() + 1
          }.${currenTime.getFullYear()} ${currenTime.getHours()}-${currenTime.getMinutes()}-${currenTime.getSeconds()}`
          const extension = isSecured ? `.nbds` : `.nbd`
          this.alert.success(
            'Успешный импорт',
            'Все данные из базы портированы в файл успешно.'
          )
          FileSaver.saveAs(b, fileName + extension)
          this.closeModal()
        }
        sub.unsubscribe()
      })
  }

  handleFileInput(files: FileList) {
    this.filetoUpload = files[0]
    this.encodingPassword = ''
  }

  isSecuredFile() {
    if (!!this.filetoUpload) {
      let fileNameArray = this.filetoUpload.name.split('.')
      const extension = fileNameArray[fileNameArray.length - 1]
      return extension === 'nbds'
    } else return false
  }

  isFileUploaded() {
    return !!this.filetoUpload
  }

  onExportFileClicked() {
    let fileReader = new FileReader()
    fileReader.readAsText(this.filetoUpload)
    fileReader.onload = (e) => {
      let textFromFile: string = String(fileReader.result)
      let array: number[] = textFromFile
        .split(',')
        .map((val: string | number) => (val = +val))
      if (this.isSecuredFile) {
        if (this.cm.isPasswordRight(array, undefined, this.encodingPassword)) {
          this.alert.success(
            'Верный пароль',
            'Пароль введен верно. Система приступает к экспорту.'
          )
          this.pq
            .exportEvents({ data: array, password: this.encodingPassword })
            .subscribe((res) => {
              this.closeModal()
              this.alert.success(
                'Успешный экспорт',
                'Данные экспортированы успешно.'
              )
              window.location.reload()
            })
        } else {
          this.alert.error('Неверный пароль', 'Вы ввели неверный пароль')
          console.log('пароль не верный')
        }
      }
    }
  }
}
