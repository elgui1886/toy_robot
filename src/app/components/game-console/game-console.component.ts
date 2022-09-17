import { Config } from './../../constants/constants';
import { GameCommandService } from './../../services/command.service';
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

  @ViewChild('errorTemplate')
  _errorTemplate: TemplateRef<any>;

  constructor(
    _fb: FormBuilder,
    private _toyStateService: ToyRobotStateService,
    private _commandDispatcherService: GameCommandService,
    private _snackBar: MatSnackBar
  ) {
    this._placeForm = this._initPlaceForm(_fb);

    this._canMove$ = this._toyStateService
      .select((state) => state && state.orientation)
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
    // Preventing to show incorrect information
    this.dismiss();
    switch (command) {
      case 'PLACE':
        const nextstate: RobotState = {
          column: this._placeForm.controls.xposition.value,
          row: this._placeForm.controls.yposition.value,
          orientation: this._placeForm.controls.orientation.value,
        };
        this._commandDispatcherService.handlePLACECommand(nextstate);
        break;
      case 'LEFT':
        this._commandDispatcherService.handleLEFTCommand();
        break;
      case 'RIGHT':
        this._commandDispatcherService.handleRIGHTCommand();
        break;
      case 'REPORT':
        this._commandDispatcherService.handleREPORTCommand(
          this._reportTemplate
        );
        break;
      case 'MOVE':
        this._commandDispatcherService.handleMOVECommand(this._errorTemplate);
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
        validators: [Validators.max(Config.columnNumber - 1), Validators.required],
      }),
      yposition: fb.control(null, {
        validators: [Validators.max(Config.rowNumber - 1), Validators.required],
      }),
      orientation: fb.control(null, {
        validators: Validators.required,
      }),
    });
    return form;
  }
}
