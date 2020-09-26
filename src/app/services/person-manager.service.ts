import { Injectable } from '@angular/core';
import {
  PersonManagerComponent,
  personManagerStates
} from '../modalWindows/person-manager/person-manager.component'
import { IPerson } from '../dto/person.dto';
import { PgQueryService } from './pg-query.service';
import { ITelephone } from '../dto/telephone.dto';
import { stateFlag } from '../dto/flag.dto';

@Injectable({
  providedIn: 'root'
})
export class PersonManagerService {
  component: PersonManagerComponent

  constructor(public pq: PgQueryService) { }

  openPM() {
  }

  openAddPM() {
    this.component.pmState = personManagerStates.addMode
    this.component.element.style.display = 'block'
  }

  openEditPM(person: IPerson) {
    this.pq.getTelephonesOfPerson(person.id)
      .subscribe((res: ITelephone[]) => {
        res.map(tel => {
          tel.contacts = []
          tel.state = stateFlag.isReaded
        })
        person.telephones = res
      })
    this.component.pmState = personManagerStates.editMode
    this.component.editablePerson = person
    this.component.element.style.display = 'block'
  }
}
