import { TestBed, waitForAsync } from '@angular/core/testing';
import { ApexLogViewerComponent } from './apex-log-viewer.component';

describe('ApexLogViewerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ApexLogViewerComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ApexLogViewerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'apex-log-viewer'`, () => {
    const fixture = TestBed.createComponent(ApexLogViewerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('apex-log-viewer');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ApexLogViewerComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('apex-log-viewer app is running!');
  });
});
