import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit {
  @Output() searchText = ''

  constructor() { }

  ngOnInit(): void {
  }

  oneEnterPressed(e :KeyboardEvent) {
    console.log(e)
    if(e.key==='Enter')
      this.searchOnEventTable()
    else if(e.key==='Escape')
      this.clearInput()
    else return
  }

  searchOnEventTable(){

  }

  clearInput(){
    this.searchText=''
  }
}
