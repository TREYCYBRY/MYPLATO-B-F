import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasPlatoPedidoComponent } from './extras-plato-pedido.component';

describe('ExtrasPlatoPedidoComponent', () => {
  let component: ExtrasPlatoPedidoComponent;
  let fixture: ComponentFixture<ExtrasPlatoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtrasPlatoPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtrasPlatoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
