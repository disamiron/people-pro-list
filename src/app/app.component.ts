import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { RandomuserService } from './shared/services/randomuser/randomuser.service';
import { UserComponent } from './shared/components/user/user.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserInterface } from './shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

const MATERIAL_MODULES: Type<unknown>[] = [
  MatPaginatorModule,
  MatProgressSpinnerModule,
];

const DEFAULT_PAGE_INDEX: number = 0;
const DEFAULT_PAGE_SIZE: number = 9;
const DEFAULT_PAGE_LENGTH: number = 9 * 100;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [UserComponent, CommonModule, ...MATERIAL_MODULES],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger(100, [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'List of users';

  public pageSize: number = DEFAULT_PAGE_SIZE;
  public pageLength: number = DEFAULT_PAGE_LENGTH;

  public pageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(
    DEFAULT_PAGE_INDEX
  );

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public users$: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject<
    UserInterface[] | null
  >(null);

  private subscription: Subscription = new Subscription();

  constructor(private randomuserService: RandomuserService) {}

  public ngOnInit(): void {
    this.subscription.add(this.processPageIndexChange());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public handlePageEvent(event: PageEvent) {
    this.pageIndex$.next(event.pageIndex);
  }

  private processPageIndexChange(): Subscription {
    return this.pageIndex$.subscribe((pageIndex: number) =>
      this.getUsers(pageIndex)
    );
  }

  private getUsers(pageIndex: number): void {
    this.isLoading$.next(true);

    this.randomuserService
      .get({ page: pageIndex, results: this.pageSize })
      .subscribe((users: UserInterface[]) => {
        this.users$.next(users);
        this.isLoading$.next(false);
      });
  }
}
