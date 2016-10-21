import Rx from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class RandService {
  private delay=10000 // ms
  private _rands: Rx.BehaviorSubject<Number>

  constructor() {
  }

  public getRands(): Rx.BehaviorSubject<Number> {
    if (!this._rands) {
      this._rands = new Rx.BehaviorSubject(42)
      setInterval(() => {
        this._rands.next(Math.floor(Math.random() * 100))
      }, this.delay)
    }
    return this._rands
  }

}
