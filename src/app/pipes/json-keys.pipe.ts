import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'jsonKeys',
})
export class JsonKeysPipe implements PipeTransform {
  transform(value: any): any[] {
    return Object.keys(value)
  }
}
