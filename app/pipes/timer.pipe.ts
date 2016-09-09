import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timer'})
export class Timer implements PipeTransform {
  transform(value: number) {
    let seconds = (Math.floor(value % 60) < 10 ? '0' : '') + Math.floor(value % 60);;
    let minutes = Math.floor(value / 60)

    return minutes + ':' + seconds;
  }
}