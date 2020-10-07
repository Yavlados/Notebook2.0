import { Component, ElementRef, OnInit } from '@angular/core';
import { emptyContact, IContact } from 'src/app/dto/contact.dto';
import { emptyEvent, IEvent } from 'src/app/dto/event.dto';
import { emptyPerson, IPerson } from 'src/app/dto/person.dto';
import { emptyTelephone, ITelephone } from 'src/app/dto/telephone.dto';

@Component({
  selector: 'app-search-manager',
  templateUrl: './search-manager.component.html',
  styleUrls: ['./search-manager.component.scss']
})
export class SearchManagerComponent implements OnInit {
  element: any
  eventForSearch: IEvent = emptyEvent
  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement
    this.closeModal()
    this.clearEvent()
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.clearEvent()
    this.element.style.display = 'none'
  }

  clearEvent() {
    let contact: IContact = emptyContact
    let telephone: ITelephone = emptyTelephone
    let person: IPerson = emptyPerson

    telephone.contacts.push(contact)
    person.telephones.push(telephone)
    this.eventForSearch.persons.push(person)
  }

}
