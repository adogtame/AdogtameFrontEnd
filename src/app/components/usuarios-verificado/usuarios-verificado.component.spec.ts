import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVerificadoComponent } from './usuarios-verificado.component';

describe('UsuariosVerificadoComponent', () => {
  let component: UsuariosVerificadoComponent;
  let fixture: ComponentFixture<UsuariosVerificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVerificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosVerificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
