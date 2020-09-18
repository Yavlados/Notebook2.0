import { Component, OnInit } from '@angular/core';
import { PgQueryService } from '../services/pg-query.service';
import { IEvent, IEventHeaders } from '../dto/eventTable.dto'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  eventTable: IEvent[]
  eventTableHeaders = IEventHeaders
  
  constructor( public pgQ: PgQueryService) { }

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents() {
    this.pgQ.getAllEvents().subscribe( (res:IEvent[] ) => {
      this.eventTable = res
  })

  }

}
