import { Injectable } from '@angular/core';
import { SearchManagerComponent } from 'src/app/modalWindows/search-manager/search-manager.component';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {
  component: SearchManagerComponent
  constructor() { }
  openSearch() {
    this.component.element.style.display = 'block'
  }
}
