import { ToyRobotStateService } from './../../services/toyrobot.state.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { columnNumber, rowNumber } from 'src/app/constants/constants';
import { Orientation } from 'src/app/models/models';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'game-console',
  templateUrl: './game-console.component.html',
  styleUrls: ['./game-console.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GameConsoleComponent implements OnInit {
  //#region Templates variables
  _placeForm: FormGroup<{
    xposition: AbstractControl;
    yposition: AbstractControl;
    orientation: AbstractControl;
  }>;
  _orientations: string[] = Object.values(Orientation);
  _disabledReason: string = '';
  //#endregion

  //#region Templates observables
  _canMove$: Observable<boolean>;
  //#endregion

  constructor(
    _fb: FormBuilder,
    private _toyStateService: ToyRobotStateService
  ) {
    this._placeForm = new FormGroup<{
      xposition: AbstractControl;
      yposition: AbstractControl;
      orientation: AbstractControl;
    }>({
      xposition: _fb.control(null, {
        validators: [Validators.max(columnNumber - 1), Validators.required],
      }),
      yposition: _fb.control(null, {
        validators: [Validators.max(rowNumber - 1), Validators.required],
      }),
      orientation: _fb.control(null, {
        validators: Validators.required,
      }),
    });

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
}
