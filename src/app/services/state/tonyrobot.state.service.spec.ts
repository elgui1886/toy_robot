import { GameConfig } from './../../models/game-config';
import { Config } from './../../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Orientation, RobotState } from './../../models/models';
import { GameCommandService } from './../command/command.service';
import { TestBed } from '@angular/core/testing';
import { ToyRobotStateService } from './toyrobot.state.service';
import { Overlay } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';
import { GameConfigurationService } from '../config/game.configuration.service';

describe('State Service', () => {
  //#region Test const fields
  const orientation = Object.values(Orientation);
  //#endregion

  //#region Test fields
  let stateService: ToyRobotStateService;
  let configurationService: GameConfigurationService;
  let initialState: RobotState;
  //#endregion

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToyRobotStateService, GameCommandService, GameConfigurationService],
    });
    stateService = TestBed.inject(ToyRobotStateService);
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

  it('should be created state service', () => {
    expect(stateService).toBeTruthy();
  });

  it('should be execute next', () => {
    expect(stateService.snapshot).toBe(initialState);
  });
  it('should be execute mapped next', () => {
    const newRow = 0;
    const newcolumn = 1;
    const newOrientation = Orientation.EAST;
    stateService.next(testState => testState.column = newcolumn);
    expect(stateService.snapshot.column).toBe(newcolumn);
    stateService.next(testState => testState.row = newRow);
    expect(stateService.snapshot.row).toBe(newRow);
    stateService.next(testState => testState.orientation = newOrientation);
    expect(stateService.snapshot.orientation).toBe(newOrientation);
  });
});
