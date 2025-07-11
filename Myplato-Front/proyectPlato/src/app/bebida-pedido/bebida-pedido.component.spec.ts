import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaPedidoComponent } from './bebida-pedido.component';

describe('BebidaPedidoComponent', () => {
  let component: BebidaPedidoComponent;
  let fixture: ComponentFixture<BebidaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BebidaPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
