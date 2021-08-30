import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVerificacionfallidaComponent } from './usuarios-verificacionfallida.component';

describe('UsuariosVerificacionfallidaComponent', () => {
  let component: UsuariosVerificacionfallidaComponent;
  let fixture: ComponentFixture<UsuariosVerificacionfallidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVerificacionfallidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosVerificacionfallidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
