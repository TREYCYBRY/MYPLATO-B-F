import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBebidaComponent } from './stock-bebida.component';

describe('StockBebidaComponent', () => {
  let component: StockBebidaComponent;
  let fixture: ComponentFixture<StockBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockBebidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
