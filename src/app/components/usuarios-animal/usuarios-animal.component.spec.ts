import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAnimalComponent } from './usuarios-animal.component';

describe('UsuariosAnimalComponent', () => {
  let component: UsuariosAnimalComponent;
  let fixture: ComponentFixture<UsuariosAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
