import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { columnNumber, rowNumber } from 'src/app/constants/constants';
import { GameTable } from 'src/app/models/models';

@Component({
  selector: 'game-tableground',
  templateUrl: './game-tableground.component.html',
  styleUrls: ['./game-tableground.component.scss']
})
export class GameTablegroundComponent implements OnInit {

  @Input()
  table: GameTable;

  constructor() { }

  ngOnInit(): void {
  }

}
