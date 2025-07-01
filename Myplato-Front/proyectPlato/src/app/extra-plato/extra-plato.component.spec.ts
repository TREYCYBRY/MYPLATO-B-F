import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPlatoComponent } from './extra-plato.component';

describe('ExtraPlatoComponent', () => {
  let component: ExtraPlatoComponent;
  let fixture: ComponentFixture<ExtraPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraPlatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
