import { Config } from './../../constants/constants';
import { TestBed } from '@angular/core/testing';
import { Orientation, RobotState } from 'src/app/models/models';
import { ToyRobotStateService } from '../state/toyrobot.state.service';
import { GameCommandService } from './command.service';
import { GameConfigurationService } from '../config/game.configuration.service';

describe('Command Service', () => {
  //#region Test const fields
  const orientation = Object.values(Orientation);
  //#endregion

  //#region Test fields
  let stateService: ToyRobotStateService;
  let commandService: GameCommandService;
  let configurationService: GameConfigurationService;
  let initialState: RobotState;
  //#endregion

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToyRobotStateService,
        GameCommandService,
        GameConfigurationService,
      ],
    });
    stateService = TestBed.inject(ToyRobotStateService);
    commandService = TestBed.inject(GameCommandService);
    configurationService = TestBed.inject(GameConfigurationService);
    configurationService.loadConfig('config.json');
    initialState = {
      column: Math.round(Math.random() * (Config.columnNumber - 1)),
      row: Math.round(Math.random() * (Config.rowNumber - 1)),
      orientation:
        orientation[Math.round(Math.random() * (orientation.length - 1))],
    };
    stateService.next(initialState);
  });

  it('should be created command service', () => {
    expect(commandService).toBeTruthy();
  });
  it('should be created state service', () => {
    expect(stateService).toBeTruthy();
  });

  it('should be execute: PLACE Command', () => {
    commandService.handlePLACECommand(initialState);
    expect(stateService.snapshot.column).toBe(initialState.column);
    expect(stateService.snapshot.row).toBe(initialState.row);
    expect(stateService.snapshot.orientation).toBe(initialState.orientation);
  });

  it('should be execute: MOVE Command - NORTH', () => {
    // Move ok
    stateService.next((testState) => {
      (testState.row = 0), (testState.orientation = Orientation.NORTH);
    });
    expect(commandService.handleMOVECommand()).toBeTrue();
    expect(stateService.snapshot.row).toBe(1);

    // Move ko
    stateService.next((testState) => {
      testState.row = Config.rowNumber - 1;
    });
    expect(commandService.handleMOVECommand()).toBeFalse();
  });
  it('should be execute: MOVE Command - SOUTH', () => {
    // Move ok
    stateService.next((testState) => {
      (testState.row = Config.rowNumber - 1),
        (testState.orientation = Orientation.SOUTH);
    });
    expect(commandService.handleMOVECommand()).toBeTrue();
    expect(stateService.snapshot.row).toBe(Config.rowNumber - 2);

    // Move ko
    stateService.next((testState) => {
      testState.row = 0;
    });
    expect(commandService.handleMOVECommand()).toBeFalse();
  });
  it('should be execute: MOVE Command - WEST', () => {
    // Move ok
    stateService.next((testState) => {
      (testState.column = 0), (testState.orientation = Orientation.WEST);
    });
    expect(commandService.handleMOVECommand()).toBeTrue();
    expect(stateService.snapshot.column).toBe(1);

    // Move ko
    stateService.next((testState) => {
      testState.column = Config.columnNumber - 1;
    });
    expect(commandService.handleMOVECommand()).toBeFalse();
  });
  it('should be execute: MOVE Command - EAST', () => {
    // Move ok
    stateService.next((testState) => {
      (testState.column = Config.columnNumber - 1),
        (testState.orientation = Orientation.EAST);
    });
    expect(commandService.handleMOVECommand()).toBeTrue();
    expect(stateService.snapshot.column).toBe(Config.columnNumber - 2);

    // Move ko
    stateService.next((testState) => {
      testState.column = 0;
    });
    expect(commandService.handleMOVECommand()).toBeFalse();
  });
});
