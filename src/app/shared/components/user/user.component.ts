import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { UserInterface } from '../../interfaces/user.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { UserFullNamePipe } from '../../pipes/user-full-name.pipe';
import { UserLocationPipe } from '../../pipes/user-location.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const PIPES: Type<unknown>[] = [UserFullNamePipe, UserLocationPipe];
const MATERIAL_MODULES: Type<unknown>[] = [MatCardModule, MatSnackBarModule];

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [CommonModule, ...PIPES, ...MATERIAL_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input({ required: true }) public user: UserInterface;

  constructor(private matSnackBar: MatSnackBar) {}

  public copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    this.matSnackBar.open('User email copied', 'Close', { duration: 2000 });
  }
}
