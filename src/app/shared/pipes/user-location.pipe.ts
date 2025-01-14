import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Pipe({
  standalone: true,
  name: 'userLocation',
})
export class UserLocationPipe implements PipeTransform {
  transform({ location }: UserInterface): string {
    return `${location.country}, ${location.city}`;
  }
}
