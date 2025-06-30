import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockComidaComponent } from './stock-comida.component';

describe('StockComidaComponent', () => {
  let component: StockComidaComponent;
  let fixture: ComponentFixture<StockComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
