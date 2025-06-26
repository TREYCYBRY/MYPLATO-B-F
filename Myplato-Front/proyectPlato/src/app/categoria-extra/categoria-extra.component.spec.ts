import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaExtraComponent } from './categoria-extra.component';

describe('CategoriaExtraComponent', () => {
  let component: CategoriaExtraComponent;
  let fixture: ComponentFixture<CategoriaExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaExtraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
