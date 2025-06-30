import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaClienteComponent } from './categoria-cliente.component';

describe('CategoriaClienteComponent', () => {
  let component: CategoriaClienteComponent;
  let fixture: ComponentFixture<CategoriaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
