import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissoesGrupoComponent } from './missoes-grupo.component';

describe('MissoesGrupoComponent', () => {
  let component: MissoesGrupoComponent;
  let fixture: ComponentFixture<MissoesGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissoesGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissoesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
