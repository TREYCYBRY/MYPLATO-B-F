import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoPedidoComponent } from './plato-pedido.component';

describe('PlatoPedidoComponent', () => {
  let component: PlatoPedidoComponent;
  let fixture: ComponentFixture<PlatoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatoPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
