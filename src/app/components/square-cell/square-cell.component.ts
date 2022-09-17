import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Orientation } from 'src/app/models/models';

@Component({
  selector: 'square-cell',
  templateUrl: './square-cell.component.html',
  styleUrls: ['./square-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareCellComponent implements OnInit {

  /**
   * Specified if cell is actually selected
   */
  @Input()
  isSelected: boolean | null;

  /**
   * Robot orientation inside the cell
   */
  _cssOrientation: string = 'orientation--nord';
  @Input()
  set orientation(value: Orientation | null) {
    if (value) this._cssOrientation = `orientation--${value.toLowerCase()}`;
  }

  /**
   * Cell's background color
   */
  @HostBinding('style.background-color')
  _backGroundColor: string;
  @Input()
  set backGroundColor(value: 'main' | 'altern') {
    this._backGroundColor = value === 'main' ?  'rgb(255, 157, 149)' : 'rgb(128, 181, 255)'
  }

  constructor() {}

  ngOnInit(): void {}
}
