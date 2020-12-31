import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TreeService {

  private _expand$: Subject<boolean> = new Subject<boolean>();
  public expand$ = this._expand$.asObservable();

  expand(): void {
    this._expand$.next(true);
  }

  collapse(): void {
    this._expand$.next(false);
  }
}
