import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTablegroundComponent } from './game-tableground.component';

describe('GameTablegroundComponent', () => {
  let component: GameTablegroundComponent;
  let fixture: ComponentFixture<GameTablegroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTablegroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTablegroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
