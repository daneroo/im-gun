import Rx from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class GunService {
  private _heartbeats: Rx.Subject<any>;
  // private _heartbeats: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));
  private _rands: Rx.BehaviorSubject<Number>

  constructor() {
    // setInterval(() => {
    //   console.log('--random')
    // }, 1000)
  }

  public connect(url): Rx.Subject<any> {
    if (!this._heartbeats) {
      // this._heartbeats = this.create(url);
    }
    return this._heartbeats;
  }
  public getRands(): Rx.BehaviorSubject<Number> {
    if (!this._rands) {
      this._rands = new Rx.BehaviorSubject(42)
      setInterval(() => {
        this._rands.next(Math.floor(Math.random() * 100))
      }, 1000)
    }
    return this._rands
  }

  // var subscription = subject.subscribe(
  // function (x) {
  //   console.log('Next: ' + x.toString());
  // },
  // function (err) {
  //   console.log('Error: ' + err);
  // },
  // function () {
  //   console.log('Completed');
  // });

  // => Next: 42

  // subject.onNext(56);
  // // => Next: 56

  // subject.onCompleted();
  // // => Completed

  // private create(): Rx.Subject<MessageEvent> {
  //   let ws = new WebSocket(url);
  //   let observable = Rx.Observable.create(
  //     (obs: Rx.Observer<any>) => {
  //       ws.onmessage = obs.next.bind(obs);
  //       ws.onerror = obs.error.bind(obs);
  //       ws.onclose = obs.complete.bind(obs);
  //       return ws.close.bind(ws);
  //     }
  //   );
  //   let observer = {
  //     next: (data: Object) => {
  //       if (ws.readyState === WebSocket.OPEN) {
  //         ws.send(JSON.stringify(data));
  //       }
  //     },
  //   };
  //   return Rx.Subject.create(observer, observable);
  // }

  getHeartbeats(): Promise<any> {
    return Promise.resolve({
      "localhost:8080": {
        "tick": "35",
        "now": "2016-10-15T19:25:58.951Z"
      },
      "localhost:8081": {
        "tick": "29",
        "now": "2016-10-15T19:25:57.976Z"
      },
      "localhost:8082": {
        "tick": "95",
        "now": "2016-10-16T04:09:33.877Z"
      }
    })
  }
}
