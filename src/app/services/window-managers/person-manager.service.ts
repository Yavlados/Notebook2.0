import { Injectable } from '@angular/core'
import {
  PersonManagerComponent,
  personManagerStates,
} from '../../modalWindows/person-manager/person-manager.component'
import { IPerson, emptyPerson } from '../../dto/person.dto'
import { PgQueryService } from '../pg-services/pg-query.service'
import { ITelephone } from '../../dto/telephone.dto'
import { stateFlag } from '../../dto/flag.dto'
import { IContact } from '../../dto/contact.dto'
import { PgService } from '../pg-services/pg.service'
import { CryptoManagerService } from '../crypto-manager.service'

@Injectable({
  providedIn: 'root',
})
export class PersonManagerService {
  component: PersonManagerComponent

  constructor(
    public pq: PgQueryService,
    public pg: PgService,
    public cm: CryptoManagerService
  ) {}

  openAddPM() {
    this.component.editablePerson = { ...emptyPerson, telephones: [] }
    this.component.pmState = personManagerStates.addMode
    this.component.element.style.display = 'block'
  }

  openEditPM(person: IPerson) {
    const sub = this.pq
      .getTelephonesOfPerson(person.id)
      .subscribe((res: Uint8Array[]) => {
        let telephones: ITelephone[] = this.cm.decode(res).rows
        telephones.map((tel) => {
          tel.contacts.map((contact: IContact) => {
            contact.state = stateFlag.isReaded
          })
          tel.state = stateFlag.isReaded
        })
        person.telephones = telephones
        sub.unsubscribe()
      })
    this.component.pmState = personManagerStates.editMode
    this.component.editablePerson = person
    this.component.element.style.display = 'block'
  }
}
