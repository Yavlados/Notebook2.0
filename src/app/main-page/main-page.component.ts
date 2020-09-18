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

  selectedEventPersons:IPerson[]

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

  onEventTableClicked(e: IEvent, index : number) {
    console.log(index)
    this.pgQ.getPersonsOfEvent(e.id)
    .subscribe( (res:IPerson[]) => {
      res = res.map( (per:IPerson) => per = this.pg.trimManager(per))
      this.selectedEventPersons = res
    })
  }

}
