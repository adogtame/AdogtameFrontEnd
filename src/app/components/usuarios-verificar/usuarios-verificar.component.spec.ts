import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVerificarComponent } from './usuarios-verificar.component';

describe('UsuariosVerificarComponent', () => {
  let component: UsuariosVerificarComponent;
  let fixture: ComponentFixture<UsuariosVerificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVerificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosVerificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
