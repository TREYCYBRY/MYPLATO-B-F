<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaComponent } from './bandeja.component';

describe('BandejaComponent', () => {
  let component: BandejaComponent;
  let fixture: ComponentFixture<BandejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaComponent } from './bandeja.component';

describe('BandejaComponent', () => {
  let component: BandejaComponent;
  let fixture: ComponentFixture<BandejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> c83b5b8e9f39b937bf9885e64c4717c87931dcf2
