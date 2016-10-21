import Rx from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class RandService {
  private _rands: Rx.BehaviorSubject<Number>

  constructor() {
  }

  private delay=10000 // ms
  public getRands(): Rx.BehaviorSubject<Number> {
    if (!this._rands) {
      this._rands = new Rx.BehaviorSubject(42)
      const self=this
      setInterval(() => {
        self._rands.next(Math.floor(Math.random() * 100))
      }, this.delay)
    }
    return this._rands
  }

}
