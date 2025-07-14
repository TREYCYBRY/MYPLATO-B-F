import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoPersonalizadoComponent } from './plato-personalizado.component';

describe('PlatoPersonalizadoComponent', () => {
  let component: PlatoPersonalizadoComponent;
  let fixture: ComponentFixture<PlatoPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatoPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
