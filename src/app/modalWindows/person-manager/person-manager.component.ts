import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core'
import { IPerson, emptyPerson } from '../../dto/person.dto'
import { ITelephone, emptyTelephone } from '../../dto/telephone.dto'
import { PgQueryService } from '../../services/pg-services/pg-query.service'
import { IContact, emptyContact } from '../../dto/contact.dto'
import { FormGroup, FormControl } from '@angular/forms'
import { stateFlag } from '../../dto/flag.dto'

export enum personManagerStates {
  editMode,
  addMode,
}

@Component({
  selector: 'app-person-manager',
  templateUrl: './person-manager.component.html',
  styleUrls: ['./person-manager.component.scss'],
})
export class PersonManagerComponent implements OnInit {
  element
  public pmState: personManagerStates
  editablePerson: IPerson = { ...emptyPerson }

  clickedTelephone: ITelephone = emptyTelephone
  clickedContact: IContact = emptyContact

  isTelephoneClicked: boolean = false
  isContactClicked: boolean = false

  @Output() personIsAdded: EventEmitter<IPerson> = new EventEmitter<IPerson>()

  addContactForm = new FormGroup({
    telephone: new FormControl(''),
    alias: new FormControl(''),
  })

  addTelephoneForm = new FormGroup({
    telephone: new FormControl(''),
  })

  constructor(private el: ElementRef, public pq: PgQueryService) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    // Initial state
    this.closeModal()
  }

  closeModal() {
    this.element.style.display = 'none'
    this.clickedTelephone = emptyTelephone
    this.clickedContact = emptyContact
    this.editablePerson = { ...emptyPerson }
    this.isTelephoneClicked = false
    this.isContactClicked = false
  }

  isEditMode() {
    return this.pmState === personManagerStates.editMode
  }

  isAddMode() {
    return this.pmState === personManagerStates.addMode
  }

  onTelephoneTableClicked(telephone: ITelephone, index: number) {
    this.clickedTelephone = telephone
    this.telephoneTablePainter(index)
    console.log(this.clickedTelephone)
  }

  onContactTableClicked(contact: IContact, index: number) {
    this.contactTablePainter(index)
    this.clickedContact = contact
  }

  telephoneTablePainter(index: number) {
    Array.from(document.getElementsByClassName(`selectedTelephoneRow`)).map(
      ($el) => {
        $el.className = $el.className.substring(
          0,
          $el.className.indexOf('selectedTelephoneRow') - 1
        )
      }
    )

    const $telephoneRow = document.getElementsByClassName(
      `telephone${index}`
    )[0]
    if (!!$telephoneRow) {
      $telephoneRow.className += ' selectedTelephoneRow'
      this.isTelephoneClicked = true
      this.isContactClicked = false
    }
  }

  contactTablePainter(index: number) {
    Array.from(document.getElementsByClassName(`selectedContactRow`)).map(
      ($el) => {
        $el.className = $el.className.substring(
          0,
          $el.className.indexOf('selectedContactRow') - 1
        )
      }
    )

    const $contactRow = document.getElementsByClassName(`contact${index}`)[0]
    if (!!$contactRow) {
      $contactRow.className += ' selectedContactRow'
      this.isContactClicked = true
    }
  }

  onTelephoneInput(e: KeyboardEvent) {
    if (e.key === `Enter` || e.key === `Escape`) {
      const $input: HTMLInputElement = <HTMLInputElement>e.target
      if (e.key === `Escape`) {
        $input.value = ''
      } else if (e.key === `Enter`) {
        this.addTelephoneClicked()
      }
    } else return
  }

  addTelephoneClicked() {
    if (!!this.addTelephoneForm.value.telephone) {
      this.editablePerson.telephones.push({
        contacts: [],
        id: null,
        internum: false,
        number: this.addTelephoneForm.value.telephone,
        oldnum: false,
        person_id: this.editablePerson.id,
        state: stateFlag.isAdded,
      })
      this.addTelephoneForm.reset()
    }
  }

  onContactInput() {
    if (
      !!this.addContactForm.value.telephone.trim() &&
      !!this.addContactForm.value.alias.trim()
    ) {
      this.clickedTelephone.contacts.push({
        alias: this.addContactForm.value.alias,
        id: null,
        internum: false,
        oldnum: false,
        telephone_id: this.clickedTelephone.id,
        number: this.addContactForm.value.telephone,
        state: stateFlag.isAdded,
      })
      this.addContactForm.reset()
    }
  }

  onEditButtonClicked() {
    const sub = this.pq
      .setUpdatePerson(this.editablePerson)
      .subscribe((res: any) => {
        console.log(res)
        sub.unsubscribe()
      })
    this.closeModal()
  }

  onAddButtonClicked() {
    this.personIsAdded.emit(this.editablePerson)
    this.closeModal()
  }

  onTelephoneChanged(e: InputEvent, telephone: ITelephone) {
    const newTelephone = (<HTMLDivElement>e.target).innerText
    if (telephone.number !== newTelephone) {
      telephone.number = newTelephone
      if (telephone.state === stateFlag.isReaded)
        telephone.state = stateFlag.isUpdated
    }
  }

  onContactNumberChanged(e: InputEvent, contact: IContact) {
    const newTelephone = (<HTMLDivElement>e.target).innerText
    if (newTelephone !== contact.number) {
      contact.number = newTelephone
      if (contact.state === stateFlag.isReaded)
        contact.state = stateFlag.isUpdated
    }
  }

  onContactAliasChanged(e: InputEvent, contact: IContact) {
    const newAlias = (<HTMLDivElement>e.target).innerText
    if (contact.alias !== newAlias) {
      contact.alias = newAlias
      if (contact.state === stateFlag.isReaded)
        contact.state = stateFlag.isUpdated
    }
  }

  personFieldIsEdited() {
    if (this.editablePerson.state === stateFlag.isReaded)
      this.editablePerson.state = stateFlag.isUpdated
  }

  isNotRemoved(obj: ITelephone | IContact) {
    return obj.state !== stateFlag.isRemoved
  }

  onContactRemoveClicked() {
    this.isContactClicked = false
    if (this.clickedContact.state === stateFlag.isReaded)
      this.clickedContact.state = stateFlag.isRemoved
    else if (
      this.clickedContact.state === stateFlag.isAdded ||
      this.clickedContact.state === stateFlag.isUpdated
    ) {
      this.clickedTelephone.contacts.splice(
        this.clickedTelephone.contacts.indexOf(this.clickedContact),
        1
      )
    }
    this.clickedContact = emptyContact
  }

  onTelephoneRemoveClicked() {
    this.isTelephoneClicked = false
    if (this.clickedTelephone.state === stateFlag.isReaded)
      this.clickedTelephone.state = stateFlag.isRemoved
    else if (
      this.clickedTelephone.state === stateFlag.isAdded ||
      this.clickedTelephone.state === stateFlag.isUpdated
    ) {
      this.editablePerson.telephones.splice(
        this.editablePerson.telephones.indexOf(this.clickedTelephone),
        1
      )
    }
    this.clickedTelephone = emptyTelephone
  }
}
