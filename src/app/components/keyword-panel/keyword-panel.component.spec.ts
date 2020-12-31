import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeywordPanelComponent } from './keyword-panel.component';

describe('KeywordPanelComponent', () => {
  let component: KeywordPanelComponent;
  let fixture: ComponentFixture<KeywordPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
