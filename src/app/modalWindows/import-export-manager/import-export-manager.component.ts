import { Component, OnInit, ElementRef } from '@angular/core';
import { PgQueryService } from '../../services/pg-query.service';

export enum ieManagerStates {
  importMode,
  exportMode
}

@Component({
  selector: 'app-import-export-manager',
  templateUrl: './import-export-manager.component.html',
  styleUrls: ['./import-export-manager.component.scss']
})
export class ImportExportManagerComponent implements OnInit {
  element
  iestate : ieManagerStates
  isWithPassword : boolean = false
  encodingPassword: string = ''

  constructor(private el: ElementRef,
    public pq:PgQueryService) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    this.closeModal()
  }

  closeModal(){
    this.element.style.display ='none'
  }

  isImportMode(){
    return this.iestate === ieManagerStates.importMode
  }

  isExportMode(){
    return this.iestate === ieManagerStates.exportMode
  }

  onImportAllClicked(){
    this.pq.importEvents({
      password: this.encodingPassword,
      onImport: 'ALL'
    })
    .subscribe( (resp) => {

    })
  }
}
