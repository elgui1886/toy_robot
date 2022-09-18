import { Config } from '../../constants/constants';
import { Orientation, RobotState } from '../../models/models';
import { ToyRobotStateService } from '../state/toyrobot.state.service';
import { Injectable } from '@angular/core';
import { isEoNoU } from 'src/app/constants/functions';

@Injectable({
  providedIn: 'root',
})
export class GameCommandService {
  private _orientations = Object.values(Orientation);
  constructor(private _toyStateService: ToyRobotStateService) {}
  /**
   * Handler for PLACE command execution
   */
  handlePLACECommand(state: RobotState) {
    this._toyStateService.next(state);
  }

  /**
   * Handler for LEFT command execution
   */
  handleLEFTCommand() {
    this._baseRotateCommand('LEFT');
  }

  /**
   * Handler for RIGHT command execution
   */
  handleRIGHTCommand() {
    this._baseRotateCommand('RIGHT');
  }

  /**
   * Handler for RIGHT command execution
   */
  handleREPORTCommand() {
    this._checkCommandValidity();
    return this._toyStateService.snapshot;
  }
  /**
   * Handler for MOVE command execution
   */
  handleMOVECommand(): boolean {
    this._checkCommandValidity();
    let canHandle = true;
    const currentState = this._toyStateService.snapshot;
    switch (currentState.orientation) {
      case Orientation.NORTH:
        currentState.row === Config.rowNumber - 1
          ? (canHandle = false)
          : (this._baseMoveCommand('row', '+'), (canHandle = true));
        break;
      case Orientation.WEST:
        currentState.column === Config.columnNumber - 1
          ? (canHandle = false)
          : (this._baseMoveCommand('column', '+'), (canHandle = true));
        break;
      case Orientation.SOUTH:
        currentState.row === 0
          ? (canHandle = false)
          : (this._baseMoveCommand('row', '-'), (canHandle = true));
        break;
      case Orientation.EAST:
        currentState.column === 0
          ? (canHandle = false)
          : (this._baseMoveCommand('column', '-'), (canHandle = true));
        break;
    }

    return canHandle;
  }

  /**
   * Base core function to move robot
   * @param direction direction where to move
   * @param operation increment or decrement position in specific direction
   */
  private _baseMoveCommand(direction: 'row' | 'column', operation: '+' | '-') {
    const execution = new Function(
      'state',
      `(state.${direction} = state.${direction} ${operation} 1)`
    );
    this._toyStateService.next(execution as any);
  }

  /**
   * Base core function to rotate robot
   * @param rotate specified the rotation (LEFT | RIGHT)
   */
  private _baseRotateCommand(rotate: 'LEFT' | 'RIGHT') {
    this._checkCommandValidity();
    const currentState = this._toyStateService.snapshot;
    const currentIndex = this._orientations.indexOf(currentState.orientation);
    let nextIndex: number;
    if (rotate === 'RIGHT') {
      nextIndex =
        currentIndex === this._orientations.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex =
        currentIndex === 0 ? this._orientations.length - 1 : currentIndex - 1;
    }
    const nextOrientation = this._orientations[nextIndex];
    this._toyStateService.next(
      (nextstate) => (nextstate.orientation = nextOrientation)
    );
  }

  /**
   * State guard to ensure that robot is in tabletop
   */
  private _checkCommandValidity() {
    const currentstate = this._toyStateService.snapshot;
    const canExecute = !!(
      currentstate &&
      !isEoNoU(currentstate.column?.toString()) &&
      !isEoNoU(currentstate.row?.toString()) &&
      !isEoNoU(currentstate.orientation?.toString())
    );
    if (!canExecute) {
      throw new Error('Cannot execute requested command');
    }
  }
}
