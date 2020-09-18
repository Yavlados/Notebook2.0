import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonValues'
})
export class JsonValuesPipe implements PipeTransform {

  transform(value: any): any[] {
    return Object.values(value);
  }

}
