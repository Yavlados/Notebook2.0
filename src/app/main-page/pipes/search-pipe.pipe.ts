import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from 'src/app/dto/event.dto';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(tableData: IEvent[], searchId: number): unknown {
    if(!!searchId)
      return tableData.filter( e => e.id === searchId)
    else
      return tableData
  }

}
