import { GameConfigurationService } from './game.configuration.service';
import { TestBed } from '@angular/core/testing';

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
