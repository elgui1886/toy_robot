import { Config } from './constants/constants';
import { GameTable } from './models/models';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'toy_robot';
  _table: GameTable = {
    row: new Array(Config.rowNumber),
    column: new Array(Config.columnNumber),
  };
}
