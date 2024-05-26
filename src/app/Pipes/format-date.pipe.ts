import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  // Funció principal del pipe que rep una data i un o més arguments
  transform(value: Date, ...args: number[]): unknown {
    let dd: number;
    let mm: number;
    let yyyy: number;
    let ddFormat: string;
    let mmFormat: string;
    let newFormat: string = '';

    // Convertim el valor d'entrada a un objecte Date
    let dateTransform = new Date(value);
    // El primer argument és el tipus de format desitjat
    let type: number = args[0];

    // Obtenim el dia, el mes i l'any de la data
    dd = dateTransform.getDate();
    mm = dateTransform.getMonth() + 1;
    yyyy = dateTransform.getFullYear();
    
    // Afegim un zero davant si el dia o el mes és menor que 10
    ddFormat = this.needZero(dd);
    mmFormat = this.needZero(mm);

    // Apliquem el format segons el tipus especificat
    if (type === 1) {
      newFormat = ddFormat + mmFormat + yyyy;
    }
    if (type === 2) {
      newFormat = ddFormat + ' / ' + mmFormat + ' / ' + yyyy;
    }
    if (type === 3) {
      newFormat = ddFormat + '/' + mmFormat + '/' + yyyy;
    }
    if (type === 4) {
      newFormat = yyyy + '-' + mmFormat + '-' + ddFormat;
    }

    // Retornem la data formatada
    return newFormat;
  }
  // Funció auxiliar per afegir un zero davant si el número és menor que 10
  private needZero(checkNumber: number): string {
    return checkNumber < 10 ? '0' + checkNumber : String(checkNumber);
  }
}
