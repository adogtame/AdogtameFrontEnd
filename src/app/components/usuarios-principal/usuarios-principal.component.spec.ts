import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPrincipalComponent } from './usuarios-principal.component';

describe('UsuariosPrincipalComponent', () => {
  let component: UsuariosPrincipalComponent;
  let fixture: ComponentFixture<UsuariosPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
