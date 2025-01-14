import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Pipe({
  standalone: true,
  name: 'userFullName',
})
export class UserFullNamePipe implements PipeTransform {
  transform({ name }: UserInterface): string {
    return `${name.title} ${name.first} ${name.last}`;
  }
}
