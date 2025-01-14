import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http/base-http.service';
import { PaginationInterface } from '../../interfaces/pagination.interface';
import { UserInterface } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RandomuserService {
  private readonly baseRandomuserUrl: string = 'https://randomuser.me/api/';

  constructor(private baseHttpService: BaseHttpService) {}

  public get(pagination: PaginationInterface): Observable<UserInterface[]> {
    return this.baseHttpService.get<UserInterface[]>(
      this.baseRandomuserUrl,
      pagination
    );
  }
}
