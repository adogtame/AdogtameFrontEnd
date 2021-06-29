import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVerificandoComponent } from './usuarios-verificando.component';

describe('UsuariosVerificandoComponent', () => {
  let component: UsuariosVerificandoComponent;
  let fixture: ComponentFixture<UsuariosVerificandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVerificandoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosVerificandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
