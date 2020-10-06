import { Component, OnInit, ElementRef } from '@angular/core'
import { alertTypes } from './alert.types.dto'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  element
  alertTypeClass: string = alertTypes.success
  alertHeader: string = 'Header'
  alertMessage: string = 'Message'
  alertShowingTime = 5000
  constructor(private el: ElementRef) {
    this.element = el.nativeElement
    this.closeAlert()
  }

  ngOnInit(): void {}

  showWarn(head: string, message: string) {
    this.alertTypeClass = alertTypes.warn
    this.showAlert(head, message)
  }

  showSuccess(head: string, message: string) {
    this.alertTypeClass = alertTypes.success
    this.showAlert(head, message)
  }

  showError(head: string, message: string) {
    this.alertTypeClass = alertTypes.error
    this.showAlert(head, message)
  }

  showAlert(head: string, message: string) {
    this.element.style.display = 'block'
    this.alertHeader = head
    this.alertMessage = message
    setTimeout(() => {
      this.closeAlert()
    }, this.alertShowingTime)
  }

  closeAlert() {
    this.element.style.display = 'none'
  }
}
