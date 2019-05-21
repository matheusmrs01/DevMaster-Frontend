import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarJogadorComponent } from './criar-jogador.component';

describe('CriarJogadorComponent', () => {
  let component: CriarJogadorComponent;
  let fixture: ComponentFixture<CriarJogadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarJogadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarJogadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
