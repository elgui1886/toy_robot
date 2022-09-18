import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
} from 'rxjs';
import { RobotState } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ToyRobotStateService {
  private readonly _state$: BehaviorSubject<RobotState> = new BehaviorSubject({
  } as RobotState);

  /**
   * Returns the current state
   */
  get snapshot(): RobotState {
    return this._state$.value;
  }

  /**
   * Select state: mapped object from RobotState
   * @param mapFn funcition that maps from RobotState to a mapped obj from it
   * @returns An observable mapped object from RobotState
   */
  select<K>(mapFn: (state: RobotState) => K): Observable<K> {
    return this._state$.pipe(map(mapFn));
  }

  /**
   * Pushes a new state.
   * @param newState The new state or a new state edit function that receives the new state as argument.
   */
  next(newState: ((newState: RobotState) => void) | RobotState) {
    let state = {} as RobotState;
    if (newState instanceof Function) {
      const currentState = this._state$.value;
      state = { ...currentState };
      newState(state);
    } else {
      state = newState;
    }
    this._state$.next(state);
  }
}
