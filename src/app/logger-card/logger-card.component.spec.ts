import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerCardComponent } from './logger-card.component';

describe('LoggerCardComponent', () => {
  let component: LoggerCardComponent;
  let fixture: ComponentFixture<LoggerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
