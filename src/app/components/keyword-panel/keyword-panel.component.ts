import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'apex-log-viewer-keyword-panel',
  templateUrl: './keyword-panel.component.html',
  styleUrls: ['./keyword-panel.component.scss']
})
export class KeywordPanelComponent implements OnInit, OnDestroy {

  @Output() changeKeywordFilter: EventEmitter<string>
      = new EventEmitter<string>();

  private keywordChange$: Subject<string> = new Subject<string>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  public ngOnInit(): void {
    // Throttle emitted events
    this.keywordChange$.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((keyword: string) => {
      this.changeKeywordFilter.emit(keyword);
    });
  }

  keyword = '';

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public keywordChanged(keyword: string): void {
    console.log(keyword);
    this.keywordChange$.next(keyword);
  }

}
