import { Config, maxRowNumber, maxColumnNumber } from './../constants/constants';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GameConfigurationService {
  /**
   * This method enable external game configuration for robot tabletop
   * @param path path where to read game configuration shaped as GameConfig interface
   */
  async loadConfig(path: string) {
    const res = await fetch(path, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.warn('No game config provider: will use default values (5x5)');
        return null;
      });

    if (res) {
      if (res.columnNumber) {
        +res.columnNumber <= maxColumnNumber ?  Config.columnNumber = +res.columnNumber :  console.error('Column must not be more than 30!');
      }
      if (res.rowNumber) {
        +res.rowNumber <= maxRowNumber ? Config.rowNumber = +res.rowNumber : console.error('Row must not be more than 30!');
      }
    }
  }
}
