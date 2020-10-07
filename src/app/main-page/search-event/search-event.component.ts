import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss'],
})
export class SearchEventComponent implements OnInit {
  @Output() search: EventEmitter<number> = new EventEmitter<number>()
  @Output() clear: EventEmitter<number> = new EventEmitter<number>()
  @Output() searchText = ''

  constructor() {}

  ngOnInit(): void {}

  oneEnterPressed(e: KeyboardEvent) {
    if (e.key === 'Enter') this.searchOnEventTable()
    else if (e.key === 'Escape') this.clearInput()
    else return
  }

  searchOnEventTable() {
    if (!!+this.searchText) this.search.emit(+this.searchText)
  }

  clearInput() {
    this.searchText = ''
    this.clear.emit(+this.searchText)
  }
}
