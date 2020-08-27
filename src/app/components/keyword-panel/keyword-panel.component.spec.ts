import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordPanelComponent } from './keyword-panel.component';

describe('KeywordPanelComponent', () => {
  let component: KeywordPanelComponent;
  let fixture: ComponentFixture<KeywordPanelComponent>;

  beforeEach(async(() => {
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
