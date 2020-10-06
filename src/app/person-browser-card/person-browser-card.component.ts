import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { IPerson } from '../dto/person.dto'
import { PersonManagerService } from '../services/person-manager.service'
@Component({
  selector: 'app-person-browser-card',
  templateUrl: './person-browser-card.component.html',
  styleUrls: ['./person-browser-card.component.scss'],
})
export class PersonBrowserCardComponent implements OnInit {
  @Input() personData: IPerson
  @Input() personIndex: number
  @Input() removable: boolean = false
  @Output() deletePerson: EventEmitter<number> = new EventEmitter<number>()

  constructor(private pm: PersonManagerService) {}

  ngOnInit(): void {}

  removePerson() {
    this.deletePerson.emit(this.personIndex)
  }

  openEditPM(person: IPerson) {
    this.pm.openEditPM(person)
  }
}
