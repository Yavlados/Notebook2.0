import { Component, OnInit } from '@angular/core';
import { PgQueryService } from '../services/pg-query.service';
import { IEvent, IEventHeaders, emptyEvent } from '../dto/event.dto'
import { IPerson } from '../dto/person.dto';
import { PgService } from '../services/pg.service';
import { EventManagerService } from '../services/event-manager.service';
import { stateFlag } from '../dto/flag.dto';
import { EventTableService } from '../services/event-table.service';
import { CryptoManagerService } from '../services/crypto-manager.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  eventTable: IEvent[]
  eventTableHeaders = IEventHeaders
  searchNumber: null | number = null
  selectedEvent: IEvent = emptyEvent

  constructor(public pgQ: PgQueryService,
    public pg: PgService,
    public em: EventManagerService,
    public et: EventTableService,
    public cm: CryptoManagerService) { }

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents() {
    const sub = this.pgQ.getAllEvents().subscribe((res: Uint8Array[]) => {
      let events : IEvent[] = (this.cm.decode(res)).rows
      this.eventTable = events.map(ev => {
        ev['persons'] = []
        ev['state'] = stateFlag.isReaded
        return ev
      })
      sub.unsubscribe()
    })
  }

  eventTableRowPainter(selectedRow: HTMLCollection) {
    //remove old selection
    Array.from(document.getElementsByClassName(`selected`)).map(node => {
      node.className = node.className.substring(
        0,
        node.className.indexOf('selected') - 1
      )
    })
    //and add new
    Array.from(selectedRow).map(node => {
      node.className += " selected"
    })
  }

  onEventTableClicked(e: IEvent, index: number) {
    this.selectedEvent = this.et.selectedEvent = e
    this.eventTableRowPainter(document.getElementsByClassName(`${index} cell`))
    const sub = this.pgQ.getPersonsOfEvent(e.id)
      .subscribe((res: Uint8Array[]) => {
        let persons :IPerson[] = (this.cm.decode(res)).rows

        persons = persons.map((per: IPerson) => {
          per.state = stateFlag.isReaded
          return per
        })
        this.selectedEvent.persons = e.persons = persons
        sub.unsubscribe()
      })
  }

  isEventGotPersons() {
    return this.selectedEvent.persons.length !== 0
  }

  isEventSelected() {
    return !! this.selectedEvent.persons
  }

  handleSearch(num: number){
    this.searchNumber = num
  }

  handleClear(){
    this.searchNumber = null
  }

  onEventTableDblClicked(event: IEvent, i:number){
    // this.onEventTableClicked(event, i)
    this.em.openEditEM(event)
  }

}
