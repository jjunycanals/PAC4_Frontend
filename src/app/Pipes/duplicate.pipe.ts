import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'duplicate',
})
export class DuplicatePipe implements PipeTransform {
  transform(value:number, ...args: number[]): unknown {
    return value *2;
  }
}