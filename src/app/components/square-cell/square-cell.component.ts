import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Orientation } from 'src/app/models/models';

@Component({
  selector: 'square-cell',
  templateUrl: './square-cell.component.html',
  styleUrls: ['./square-cell.component.scss'],
})
export class SquareCellComponent implements OnInit {
  @HostBinding('class.square')

  /**
   * Specified if cell is actually selected
   */
  @Input()
  isSelected: boolean;

  /**
   * Robot orientation inside the cell
   */
  _cssOrientation: string = 'orientation--nord';
  @Input()
  set orientation(value: Orientation) {
    if (value) this._cssOrientation = `orientation--${value.toLowerCase()}`;
  }

  /**
   * Cell's background color
   */
  @Input()
  backGroundColor: 'pink' | 'blue' = 'blue';

  constructor() {}

  ngOnInit(): void {}
}
