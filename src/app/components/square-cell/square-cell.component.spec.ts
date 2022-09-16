import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareCellComponent } from './square-cell.component';

describe('SquareCellComponent', () => {
  let component: SquareCellComponent;
  let fixture: ComponentFixture<SquareCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
