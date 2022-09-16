import { RobotState } from './../../models/models';
import { ToyRobotStateService } from './../../services/toyrobot.state.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { columnNumber, rowNumber } from 'src/app/constants/constants';
import { Commands, Orientation } from 'src/app/models/models';
import { map, Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GameConsoleComponent implements OnInit {
  //#region Templates fields
  /**
   * From for PLACE command
   */
  _placeForm: FormGroup<{
    xposition: AbstractControl;
    yposition: AbstractControl;
    orientation: AbstractControl;
  }>;

  /**
   * Possible orientation values
   */
  _orientations: string[] = Object.values(Orientation);

  /**
   * Feedback for disabled button reason
   */
  _disabledReason: string = '';
  //#endregion

  //#region Templates observables
  /**
   * Boolean to enabled secondary command (LEFT, RIGHT, MOVE).
   * Only if robot is in tableground we can dispatch them
   */
  _canMove$: Observable<boolean>;
  //#endregion

  @ViewChild('reportTemplate')
  _reportTemplate: TemplateRef<any>;

  constructor(
    _fb: FormBuilder,
    private _toyStateService: ToyRobotStateService,
    private _snackBar: MatSnackBar
  ) {
    this._placeForm = this._initPlaceForm(_fb);

    this._canMove$ = this._toyStateService
      .select((state) => state.orientation)
      .pipe(
        map((val) => !!!val),
        tap((val) =>
          val
            ? (this._disabledReason = 'Posiziona prima il robot')
            : (this._disabledReason = '')
        )
      );
  }

  ngOnInit(): void {}

  /**
   * Update toy robot state (fully or parzially)
   */
  dispatchCommand(command: Commands) {
    // Preventing not to shown incorrect information
    this.dismiss();
      
    switch (command) {
      case 'PLACE':
        this._handlePLACECommand();
        break;
      case 'LEFT':
        this._handleLEFTCommand();
        break;
      case 'RIGHT':
        this._handleRIGHTCommand();
        break;
      case 'REPORT':
        this._handleREPORTCommand();
        break;
    }
  }

  /**
   * Dismiss notification snackbar
   */
  dismiss() {
    this._snackBar.dismiss();
  }

  /**
   * Build form to handle PLACE command
   * @param fb angular form builder
   * @returns form for PLACE command
   */
  private _initPlaceForm(fb: FormBuilder) {
    const form = new FormGroup<{
      xposition: AbstractControl;
      yposition: AbstractControl;
      orientation: AbstractControl;
    }>({
      xposition: fb.control(null, {
        validators: [Validators.max(columnNumber - 1), Validators.required],
      }),
      yposition: fb.control(null, {
        validators: [Validators.max(rowNumber - 1), Validators.required],
      }),
      orientation: fb.control(null, {
        validators: Validators.required,
      }),
    });
    return form;
  }

  /**
   * Handler for PLACE command execution
   */
  private _handlePLACECommand() {
    if (this._placeForm.valid) {
      const state: RobotState = {
        column: this._placeForm.controls.xposition.value,
        row: this._placeForm.controls.yposition.value,
        orientation: this._placeForm.controls.orientation.value,
      };
      this._toyStateService.next(state);
    }
  }

  /**
   * Handler for LEFT command execution
   */
  private _handleLEFTCommand() {
    const state = this._toyStateService.snapshot;
    //If there is an orientation the robot is in the tableground
    if (state && state.orientation) {
      const currentIndex = this._orientations.indexOf(
        state.orientation.toString()
      );
      const nextIndex =
        currentIndex === 0 ? this._orientations.length - 1 : currentIndex - 1;
      const nextOrientation =
        Orientation[this._orientations[nextIndex] as keyof typeof Orientation];
      this._toyStateService.next(
        (state) => (state.orientation = nextOrientation)
      );
    }
  }

  /**
   * Handler for RIGHT command execution
   */
  private _handleRIGHTCommand() {
    const state = this._toyStateService.snapshot;
    //If there is an orientation the robot is in the tableground
    if (state && state.orientation) {
      const currentIndex = this._orientations.indexOf(
        state.orientation.toString()
      );
      const nextIndex =
        currentIndex === this._orientations.length - 1 ? 0 : currentIndex + 1;
      const nextOrientation =
        Orientation[this._orientations[nextIndex] as keyof typeof Orientation];
      this._toyStateService.next(
        (state) => (state.orientation = nextOrientation)
      );
    }
  }

  /**
   * Handler for RIGHT command execution
   */
  private _handleREPORTCommand() {
    this._snackBar.dismiss();
    const currentState = this._toyStateService.snapshot;
    this._snackBar.openFromTemplate(this._reportTemplate, {
      data: currentState,
      duration: 5000
    });
  }
}
