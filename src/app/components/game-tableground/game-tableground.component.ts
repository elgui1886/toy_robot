import { map, Observable, of } from 'rxjs';
import { ToyRobotStateService } from './../../services/toyrobot.state.service';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { columnNumber, rowNumber } from 'src/app/constants/constants';
import { GameTable, Orientation } from 'src/app/models/models';

@Component({
  selector: 'game-tableground',
  templateUrl: './game-tableground.component.html',
  styleUrls: ['./game-tableground.component.scss']
})
export class GameTablegroundComponent implements OnInit {


  @Input()
  table: GameTable;
  
  orientation$: Observable<Orientation>;
  _isRobotInSquare$: (row: number, column: number) => Observable<boolean>;

  constructor(private _toyStateService: ToyRobotStateService) {
    this._isRobotInSquare$ = (row: number, column: number) => {
      return this._toyStateService.get().pipe(map(state => {
        const rowstate = state.row;
        const columnstate = state.column;
        const revertedRow = Math.abs(row - (this.table.row.length - 1))
        return revertedRow === rowstate && column === columnstate
      }))
    }
    this.orientation$ = this._toyStateService.select(x => x.orientation);
  }

  ngOnInit(): void {
  }

}
