import { Component } from '@angular/core';
import { PgService } from './services/pg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularApp';

  constructor (public pg: PgService) {

  }

  checkRouterState(){
    if(document.location.pathname !== '/login')
      return true
    else
      return false
  }
}
