import { Config } from './../../constants/constants';
import { map, Observable, of } from 'rxjs';
import { ToyRobotStateService } from '../../services/state/toyrobot.state.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GameTable, Orientation } from 'src/app/models/models';

@Component({
  selector: 'game-tableground',
  templateUrl: './game-tableground.component.html',
  styleUrls: ['./game-tableground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTablegroundComponent implements OnInit {
  //#region Input fields
  @Input()
  table: GameTable;
  //#endregion
  //#region Template fields
  /**
   * Observe robot orientation change
   */
  _orientation$: Observable<Orientation>;
  /**
   * Observe if robot is actually in tableground
   */
  _isRobotInSquare$: (row: number, column: number) => Observable<boolean>;

  /**
   * Dinamically se table row height based on game configuration
   */
  _rowheight = `${100 / Config.rowNumber}%`
  //#endregion

  constructor(private _toyStateService: ToyRobotStateService) {
    this._isRobotInSquare$ = (row: number, column: number) => {
      return this._toyStateService.select(state => state).pipe(
        map((state) => {
          const rowstate = state.row;
          const columnstate = state.column;
          const revertedRow = Math.abs(row - (this.table.row.length - 1));
          return revertedRow === rowstate && column === columnstate;
        })
      );
    };
    this._orientation$ = this._toyStateService.select((x) => x.orientation);
  }

  ngOnInit(): void { }
}
