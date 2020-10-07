import { Injectable } from '@angular/core'
import { IEvent } from '../dto/event.dto'
import { PgQueryService } from './pg-services/pg-query.service'

@Injectable({
  providedIn: 'root',
})
export class EventTableService {
  selectedEvent: IEvent
  constructor(public pq: PgQueryService) {}

  onRemoveClicked() {
    return this.pq.setRemoveEvent(this.selectedEvent)
  }
}
