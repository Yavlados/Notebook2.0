import { Injectable } from '@angular/core'
import { AlertComponent } from '../../alert/alert.component'

@Injectable({
  providedIn: 'root',
})
export class AlertManagerService {
  component: AlertComponent

  constructor() {}

  success(header: string, message: string) {
    this.component.showSuccess(header, message)
  }

  warning(header: string, message: string) {
    this.component.showWarn(header, message)
  }

  error(header: string, message: string) {
    this.component.showError(header, message)
  }
}
