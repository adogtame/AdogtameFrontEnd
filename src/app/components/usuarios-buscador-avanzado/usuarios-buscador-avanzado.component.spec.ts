import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosBuscadorAvanzadoComponent } from './usuarios-buscador-avanzado.component';

describe('UsuariosBuscadorAvanzadoComponent', () => {
  let component: UsuariosBuscadorAvanzadoComponent;
  let fixture: ComponentFixture<UsuariosBuscadorAvanzadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosBuscadorAvanzadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosBuscadorAvanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
