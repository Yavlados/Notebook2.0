import { Component, OnInit, ElementRef } from '@angular/core';
import { IPerson, emptyPerson } from '../../dto/person.dto'
import { ITelephone, emptyTelephone } from 'src/app/dto/telephone.dto';
import { PgQueryService } from 'src/app/services/pg-query.service';
import { IContact } from 'src/app/dto/contact.dto';
import { FormGroup, FormControl } from '@angular/forms';

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
  editablePerson: IPerson = emptyPerson
  clickedTelephone: ITelephone = emptyTelephone
  isTelephoneClicked: boolean = false

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
    this.editablePerson=emptyPerson
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
          person_id: this.editablePerson.id
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
        number: this.addContactForm.value.telephone
      })
      this.addContactForm.reset()
  }

  onEditButtonClicked(){
    console.log(this.editablePerson)
  }
}
