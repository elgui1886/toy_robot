import { Config } from './../constants/constants';
import { Orientation, RobotState } from './../models/models';
import { ToyRobotStateService } from './toyrobot.state.service';
import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GameCommandService {
  private _orientations = Object.values(Orientation);
  constructor(
    private _toyStateService: ToyRobotStateService,
    private _snackBar: MatSnackBar
  ) {}
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
    const currentState = this._toyStateService.snapshot;
    const currentIndex = this._orientations.indexOf(
      (currentState.orientation as any).toString()
    );
    const nextIndex =
      currentIndex === 0 ? this._orientations.length - 1 : currentIndex - 1;
    const nextOrientation =
      Orientation[this._orientations[nextIndex] as keyof typeof Orientation];
    this._toyStateService.next(
      (state) => (state.orientation = nextOrientation)
    );
  }

  /**
   * Handler for RIGHT command execution
   */
  handleRIGHTCommand() {
    const currentState = this._toyStateService.snapshot;
    //If there is an orientation the robot is in the tableground
    const currentIndex = this._orientations.indexOf(
      (currentState.orientation as any).toString()
    );
    const nextIndex =
      currentIndex === this._orientations.length - 1 ? 0 : currentIndex + 1;
    const nextOrientation =
      Orientation[this._orientations[nextIndex] as keyof typeof Orientation];
    this._toyStateService.next(
      (nextstate) => (nextstate.orientation = nextOrientation)
    );
  }

  /**
   * Handler for RIGHT command execution
   */
  handleREPORTCommand(reportTemplate: TemplateRef<any>) {
    const currentState = this._toyStateService.snapshot;
    if (currentState) {
      this._snackBar.openFromTemplate(reportTemplate, {
        data: currentState,
        duration: 5000,
      });
    }
  }
  /**
   * Handler for MOVE command execution
   */
  handleMOVECommand(errorTemplate: TemplateRef<any>) {
    const currentState = this._toyStateService.snapshot;
    if (currentState) {
      switch (currentState.orientation) {
        case Orientation.NORTH:
          currentState.row === Config.rowNumber - 1
            ? this._openErrorSnackbar(errorTemplate)
            : this._toyStateService.next(
                (nextstate) => (nextstate.row = currentState.row + 1)
              );
          break;
        case Orientation.WEST:
          currentState.column === Config.columnNumber - 1
            ? this._openErrorSnackbar(errorTemplate)
            : this._toyStateService.next(
                (nextstate) => (nextstate.column = currentState.column + 1)
              );
          break;
        case Orientation.SOUTH:
          currentState.row === 0
            ? this._openErrorSnackbar(errorTemplate)
            : this._toyStateService.next(
                (nextstate) => (nextstate.row = currentState.row - 1)
              );
          break;
        case Orientation.EAST:
          currentState.column === 0
            ? this._openErrorSnackbar(errorTemplate)
            : this._toyStateService.next(
                (nextstate) => (nextstate.column = currentState.column - 1)
              );
          break;
      }
    }
  }

  /**
   * Utility for shown error snackbar based on custom template
   * @param errorTemplate template to be shown on error
   */
  private _openErrorSnackbar(errorTemplate: TemplateRef<any>) {
    this._snackBar.openFromTemplate(errorTemplate, {
      panelClass: ['error-snackbar'],
      duration: 5000,
    });
  }
}
