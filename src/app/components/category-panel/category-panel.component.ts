import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'apex-log-viewer-log-categories',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class LogCategoriesComponent implements OnInit, OnDestroy {

  public static readonly HIDDEN_BY_DEFAULT = [
    'CUMULATIVE_LIMIT_USAGE',
    'CUMULATIVE_LIMIT_USAGE_END',
    'EXECUTION_FINISHED',
    'EXECUTION_STARTED',
    'HEAP_ALLOCATE',
    'LIMIT_USAGE_FOR_NS',
    'STATEMENT_EXECUTE'
  ];

  public static readonly DEBUG_CATEGORIES = [
    'EXCEPTION_THROWN',
    'FATAL_ERROR',
    'USER_DEBUG'
  ];

  public static readonly DB_CATEGORIES = [
    'CUMULATIVE_LIMIT_USAGE',
    'CUMULATIVE_LIMIT_USAGE_END',
    'DML_BEGIN',
    'DML_END',
    'LIMIT_USAGE_FOR_NS',
    'QUERY_MORE_BEGIN',
    'QUERY_MORE_END',
    'QUERY_MORE_ITERATIONS',
    'SAVEPOINT_ROLLBACK',
    'SAVEPOINT_SET',
    'SOQL_EXECUTE_BEGIN',
    'SOQL_EXECUTE_END'
  ];

  public static readonly METHOD_CATEGORIES = [
    'CODE_UNIT_FINISHED',
    'CODE_UNIT_STARTED',
    'CONSTRUCTOR_ENTRY',
    'CONSTRUCTOR_EXIT',
    'EXECUTION_FINISHED',
    'EXECUTION_STARTED',
    'EXCEPTION_THROWN',
    'METHOD_ENTRY',
    'METHOD_EXIT',
    'SYSTEM_CONSTRUCTOR_ENTRY',
    'SYSTEM_CONSTRUCTOR_EXIT',
    'SYSTEM_METHOD_ENTRY',
    'SYSTEM_METHOD_EXIT'
  ];

  @Input() categories: string[];

  @Input() categoryMap: Map<string, boolean>;

  @Output() changeCategory: EventEmitter<any> = new EventEmitter();

  @Output() showOnlyCategories: EventEmitter<string[]> = new EventEmitter();

  @Output() hideOnlyCategories: EventEmitter<string[]> = new EventEmitter();

  form: FormGroup = this._formBuilder.group({
    'quick-select': 'default'
  });

  private _unsubscribe$ = new Subject();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form.get('quick-select')?.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        switch (value) {
          case 'default':
            this.hideOnlyCategories.emit(LogCategoriesComponent.HIDDEN_BY_DEFAULT);
            break;
          case 'all':
            this.hideOnlyCategories.emit([]);
            break;
          case 'none':
            this.showOnlyCategories.emit([]);
            break;
          case 'debug':
            this.showOnlyCategories.emit(LogCategoriesComponent.DEBUG_CATEGORIES);
            break;
          case 'database':
            this.showOnlyCategories.emit(LogCategoriesComponent.DB_CATEGORIES);
            break;
          case 'methods':
            this.showOnlyCategories.emit(LogCategoriesComponent.METHOD_CATEGORIES);
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public categoryChanged(event: Event, cat: string) {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.changeCategory.emit({
        cat,
        visible: checked
    });
    this.form.get('quick-select')?.setValue('');
  }

  public showDefault(): void {
        this.hideOnlyCategories.emit(LogCategoriesComponent.HIDDEN_BY_DEFAULT);
  }

  public showAll(): void {
        this.hideOnlyCategories.emit([]);
  }

  public showNone(): void {
        this.showOnlyCategories.emit([]);
  }

  public showDebug(): void {
        this.showOnlyCategories.emit(LogCategoriesComponent.DEBUG_CATEGORIES);
  }

  public showDatabase(): void {
        this.showOnlyCategories.emit(LogCategoriesComponent.DB_CATEGORIES);
  }

  public showMethods(): void {
        this.showOnlyCategories.emit(LogCategoriesComponent.METHOD_CATEGORIES);
  }

}
