import { rowNumber, columnNumber } from './constants/constants';
import { GameTable } from './models/models';
import { Orientation } from 'src/app/models/models';
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { parseHostBindings } from '@angular/compiler';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'toy_robot';
  _table: GameTable = {
    row: new Array(rowNumber),
    column: new Array(columnNumber),
  };
}
