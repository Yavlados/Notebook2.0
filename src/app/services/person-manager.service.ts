import { Injectable } from '@angular/core';
import {
  PersonManagerComponent,
  personManagerStates
} from '../modalWindows/person-manager/person-manager.component'
import { IPerson, emptyPerson } from '../dto/person.dto';
import { PgQueryService } from './pg-query.service';
import { ITelephone } from '../dto/telephone.dto';
import { stateFlag } from '../dto/flag.dto';
import { IContact } from '../dto/contact.dto';
import { PgService } from './pg.service';

@Injectable({
  providedIn: 'root'
})
export class PersonManagerService {
  component: PersonManagerComponent

  constructor(public pq: PgQueryService,
    public pg: PgService) { }

  openAddPM() {
    this.component.editablePerson = {...emptyPerson, telephones:[]}
    this.component.pmState = personManagerStates.addMode
    this.component.element.style.display = 'block'
  }

  openEditPM(person: IPerson) {
    this.pq.getTelephonesOfPerson(person.id)
      .subscribe((res: ITelephone[]) => {
        res.map(tel => {
          tel = this.pg.trimManager(tel)
          tel.contacts.map( (contact :IContact) =>{
            contact = this.pg.trimManager(contact)
            contact.state = stateFlag.isReaded
          } )
          tel.state = stateFlag.isReaded
        })
        person.telephones = res
      })
    this.component.pmState = personManagerStates.editMode
    this.component.editablePerson = person
    this.component.element.style.display = 'block'
  }
}
