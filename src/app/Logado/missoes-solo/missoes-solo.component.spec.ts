import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissoesSoloComponent } from './missoes-solo.component';

describe('MissoesSoloComponent', () => {
  let component: MissoesSoloComponent;
  let fixture: ComponentFixture<MissoesSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissoesSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissoesSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
