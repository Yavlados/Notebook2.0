import { Component, OnInit, Input } from '@angular/core';
import {IPerson} from '../../dto/person.dto'
@Component({
  selector: 'app-person-browser-card',
  templateUrl: './person-browser-card.component.html',
  styleUrls: ['./person-browser-card.component.scss']
})
export class PersonBrowserCardComponent implements OnInit {
  @Input()personData: IPerson

  constructor() { }

  ngOnInit(): void {
  }

}
