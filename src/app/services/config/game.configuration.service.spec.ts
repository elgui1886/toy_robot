import { GameConfigurationService } from './game.configuration.service';
import { GameConfig } from '../../models/game-config';
import { Config } from '../../constants/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Orientation, RobotState } from '../../models/models';
import { GameCommandService } from '../command/command.service';
import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { TemplateRef } from '@angular/core';

describe('Configuration Service', () => {

  let configurationService: GameConfigurationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameConfigurationService],
    });
    configurationService = TestBed.inject(GameConfigurationService);
  });

  it('should be created state service', () => {
    expect(configurationService).toBeTruthy();
  });

  it('should be created state service', async () => {
    expect(configurationService.loadConfig('config.json')).toBeTruthy()
  });


});
