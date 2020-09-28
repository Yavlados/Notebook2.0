import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { IPerson, emptyPerson } from '../../dto/person.dto'
import { ITelephone, emptyTelephone } from 'src/app/dto/telephone.dto';
import { PgQueryService } from 'src/app/services/pg-query.service';
import { IContact } from 'src/app/dto/contact.dto';
import { FormGroup, FormControl } from '@angular/forms';
import { stateFlag } from 'src/app/dto/flag.dto';

export enum personManagerStates {
  editMode,
  addMode
}


@Component({
  selector: 'app-person-manager',
  templateUrl: './person-manager.component.html',
  styleUrls: ['./person-manager.component.scss']
})
export class PersonManagerComponent implements OnInit {
  element
  public pmState: personManagerStates
  editablePerson: IPerson = {...emptyPerson}
  clickedTelephone: ITelephone = emptyTelephone
  isTelephoneClicked: boolean = false
  @Output() personIsAdded :EventEmitter<IPerson> = new EventEmitter<IPerson>()
  

  addContactForm = new FormGroup({
    telephone: new FormControl(''),
    alias: new FormControl('')
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
    this.clickedTelephone=emptyTelephone
    this.editablePerson={...emptyPerson}
    this.isTelephoneClicked = false

  }

  isEditMode() {
    return this.pmState === personManagerStates.editMode
  }

  isAddMode() {
    return this.pmState === personManagerStates.addMode
  }

  onTelephoneTableClicked(telephone: ITelephone, index: number) {
    this.clickedTelephone = telephone
    this.tablePainter(index)
    //NEEDS TO FIX
    if(telephone.contacts.length === 0)
    {
      this.pq.getTelephoneContacts(this.clickedTelephone.id)
      .subscribe((res: IContact[]) => {
        res.map( cont => {
          cont.state = stateFlag.isReaded
        })
        this.clickedTelephone.contacts = res
      })
    }

  }

  tablePainter(index: number) {
    Array.from(document.getElementsByClassName(`selectedTelephoneRow`)).map($el => {
      $el.className =
        $el.className.substring(
          0,
          $el.className.indexOf('selectedTelephoneRow') - 1
        )
    })

    const $telephoneRow = document.getElementsByClassName(`telephone${index}`)[0]
    if(!! $telephoneRow)
    {
      $telephoneRow.className += ' selectedTelephoneRow'
      this.isTelephoneClicked = true
    }

  }

  onTelephoneInput(e :KeyboardEvent){
    if(e.key === `Enter` || e.key === `Escape`)
    {
      const $input: HTMLInputElement = <HTMLInputElement>(e.target)
      if(e.key === `Escape`)
      {
        $input.value = ''
      }else if(e.key === `Enter`){
        this.editablePerson.telephones.push({
          contacts:[],
          id: null,
          internum: false,
          number: $input.value,
          oldnum: false,
          person_id: this.editablePerson.id,
          state: stateFlag.isAdded
        })
        $input.value = ''
      }
    }else return
  }

  onContactInput(){
      this.clickedTelephone.contacts.push({
        alias: this.addContactForm.value.alias,
        id: null,
        internum: false,
        oldnum: false,
        telephone_id: this.clickedTelephone.id,
        number: this.addContactForm.value.telephone,
        state: stateFlag.isAdded
      })
      this.addContactForm.reset()
  }

  onEditButtonClicked(){
    this.pq.setUpdatePerson(this.editablePerson)
    .subscribe((res: any) => {
      console.log(res)
    })
    this.closeModal()
  }

  onAddButtonClicked(){
    this.personIsAdded.emit(this.editablePerson)
    this.closeModal()
  }

  onTelephoneChanged(e : InputEvent, telephone: ITelephone){
    
      const newTelephone = (<HTMLDivElement>e.target).innerText
      telephone.number= newTelephone
      if(telephone.state === stateFlag.isReaded)
        telephone.state = stateFlag.isUpdated
      console.log(telephone)  
      }

  onContactNumberChanged(e : InputEvent, contact: IContact){
    const newTelephone = (<HTMLDivElement>e.target).innerText
    contact.number= newTelephone
    if(contact.state === stateFlag.isReaded)
      contact.state = stateFlag.isUpdated
  }

  onContactAliasChanged(e : InputEvent, contact: IContact){
    const newAlias = (<HTMLDivElement>e.target).innerText
    contact.alias= newAlias
    if(contact.state === stateFlag.isReaded)
      contact.state = stateFlag.isUpdated
  }

  personFieldIsEdited(){
    if(this.editablePerson.state === stateFlag.isReaded)
      this.editablePerson.state = stateFlag.isUpdated
  }

  isNotRemoved(obj :ITelephone | IContact){
    return obj.state !== stateFlag.isRemoved
  }
}
