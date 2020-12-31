import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogCategoriesComponent } from './category-panel.component';

describe('LogCategoriesComponent', () => {
  let component: LogCategoriesComponent;
  let fixture: ComponentFixture<LogCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
