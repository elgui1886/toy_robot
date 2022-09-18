import { Config } from './../../constants/constants';
import { GameConfigurationService } from './../../services/config/game.configuration.service';
import { Overlay } from '@angular/cdk/overlay';
import { Orientation, RobotState } from './../../models/models';
import { GameCommandService } from './../../services/command/command.service';
import { ToyRobotStateService } from './../../services/state/toyrobot.state.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConsoleComponent } from './game-console.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('Game Console Component', () => {
  let component: GameConsoleComponent;
  let fixture: ComponentFixture<GameConsoleComponent>;
  let stateService: ToyRobotStateService;
  let configurationService: GameConfigurationService;
  let formValue: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameConsoleComponent],
      imports: [
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [
        ToyRobotStateService,
        GameCommandService,
        MatSnackBar,
        FormBuilder,
        Overlay,
        GameConfigurationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stateService = TestBed.inject(ToyRobotStateService);
    configurationService = TestBed.inject(GameConfigurationService);
    configurationService.loadConfig('config.json');
    formValue = {
      orientation: Orientation.NORTH,
      xposition: 0,
      yposition: 0,
    };
    component._placeForm.patchValue(formValue);
    component.dispatchCommand('PLACE');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch command: PLACE', () => {
    component.dispatchCommand('PLACE');
    expect(stateService.snapshot.column).toBe(formValue.xposition);
    expect(stateService.snapshot.row).toBe(formValue.yposition);
    expect(stateService.snapshot.orientation).toBe(formValue.orientation);
  });
  it('should dispatch command: LEFT', () => {
    component.dispatchCommand('LEFT');
    expect(stateService.snapshot.orientation).toBe(Orientation.EAST);
    component.dispatchCommand('LEFT');
    expect(stateService.snapshot.orientation).toBe(Orientation.SOUTH);
    component.dispatchCommand('LEFT');
    expect(stateService.snapshot.orientation).toBe(Orientation.WEST);
    component.dispatchCommand('LEFT');
    expect(stateService.snapshot.orientation).toBe(Orientation.NORTH);
  });
  it('should dispatch command: RIGHT', () => {
    component.dispatchCommand('RIGHT');
    expect(stateService.snapshot.orientation).toBe(Orientation.WEST);
    component.dispatchCommand('RIGHT');
    expect(stateService.snapshot.orientation).toBe(Orientation.SOUTH);
    component.dispatchCommand('RIGHT');
    expect(stateService.snapshot.orientation).toBe(Orientation.EAST);
    component.dispatchCommand('RIGHT');
    expect(stateService.snapshot.orientation).toBe(Orientation.NORTH);
  });
  it('should dispatch command: MOVE NORTH', () => {
    // Move ok
    let rowvalue = stateService.snapshot.row;
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.row).toBe(rowvalue + 1);
    // Move ko
    stateService.next((state) => (state.row = Config.rowNumber - 1));
    rowvalue = stateService.snapshot.row;
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.row).toBe(rowvalue);
  });
  it('should dispatch command: MOVE SOUTH', () => {
    // Move ok
    stateService.next((state) => (state.row = 1));
    let rowvalue = stateService.snapshot.row;
    stateService.next((state) => (state.orientation = Orientation.SOUTH));
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.row).toBe(rowvalue - 1);
    // Move ko
    stateService.next((state) => (state.row = 0));
    rowvalue = stateService.snapshot.row;
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.row).toBe(rowvalue);
  });
  it('should dispatch command: MOVE WEST', () => {
    // Move ok
    let columnvalue = stateService.snapshot.column;
    stateService.next((state) => (state.orientation = Orientation.WEST));
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.column).toBe(columnvalue + 1);
    // Move ko
    stateService.next((state) => (state.column = Config.columnNumber - 1));
    columnvalue = stateService.snapshot.column;
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.column).toBe(columnvalue);
  });
  it('should dispatch command: MOVE EAST', () => {
    // Move ok
    stateService.next((state) => (state.column = 1));
    let columnvalue = stateService.snapshot.column;
    stateService.next((state) => (state.orientation = Orientation.EAST));
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.column).toBe(columnvalue - 1);
    // Move ko
    stateService.next((state) => (state.column = 0));
    columnvalue = stateService.snapshot.column;
    component.dispatchCommand('MOVE');
    expect(stateService.snapshot.column).toBe(formValue.xposition);
  });
});
