import { Component, OnInit } from '@angular/core';
import { PgQueryService } from '../services/pg-query.service';
import { IEvent, IEventHeaders } from '../dto/event.dto'
import { IPerson } from '../dto/person.dto';
import { PgService } from '../services/pg.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  eventTable: IEvent[]
  eventTableHeaders = IEventHeaders

  selectedEventPersons: IPerson[]

  constructor(public pgQ: PgQueryService, public pg: PgService) { }

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents() {
    this.pgQ.getAllEvents().subscribe((res: IEvent[]) => {
      this.eventTable = res.map(ev => {
        ev = this.pg.trimManager(ev)
        ev['persons'] = []
        return ev
      })

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
    this.eventTableRowPainter(document.getElementsByClassName(`${index} cell`))
    this.pgQ.getPersonsOfEvent(e.id)
      .subscribe((res: IPerson[]) => {
        res = res.map((per: IPerson) => per = this.pg.trimManager(per))
        this.selectedEventPersons = res
      })
  }

  isEventGotPersons() {
    return this.selectedEventPersons.length !== 0
  }

  isEventSelected() {
    return !! this.selectedEventPersons
  }

}
