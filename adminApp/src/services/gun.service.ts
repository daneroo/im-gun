import Rx from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { WindowRef } from './window.reference';

// declare class Gun{};
@Injectable()
export class GunService {
  private heartRate = 10000 // ms
  private Gun: any;
  private _heartbeatsSubject: Rx.BehaviorSubject<any>;

  constructor(private winRef: WindowRef) {
    // console.log('window.Gun', winRef.nativeWindow.Gun)
    this.Gun = winRef.nativeWindow.Gun
  }

  private heartbeats = {
    "localhost:8080": {
      "tick": 35,
      "now": "2016-10-15T19:25:58.951Z"
    },
    "localhost:8081": {
      "tick": 29,
      "now": "2016-10-15T19:25:57.976Z"
    },
    "localhost:8082": {
      "tick": 95,
      "now": "2016-10-16T04:09:33.877Z"
    }
  }
  getHeartbeats(): Rx.BehaviorSubject<any> {
    if (!this._heartbeatsSubject) {
      this._heartbeatsSubject = new Rx.BehaviorSubject(this.heartbeats)
      // this.startSynthetic()
      this.startGun()
    }
    return this._heartbeatsSubject
  }
  startGun(): void {
    // Move this to singleton init
    // const peers = ['8080'].map(function (p) { return 'http://localhost:' + p + '/gun' })
    const peers = ['8080', '8081', '8082'].map(function (p) { return 'http://localhost:' + p + '/gun' })
    console.log('peers', peers)
    const gun = this.Gun(peers);

    const heartbeatsGun = gun.get('heartbeats');
    //const accum={};
    const outerhb = this.heartbeats;
    const hbs = this._heartbeatsSubject
    
    heartbeatsGun.map(function (o, name) {
      // name = name.replace(':', '-')
      // console.log(`-heartbeats[${name}] >> ${JSON.stringify(o)}`)

      const hb = outerhb[name]
      hb.tick = o.tick
      hb.now = o.now
      console.log(`-heartbeats[${name}] >> ${JSON.stringify(hb)}`)
      
      hbs.next(outerhb)
      
    }, { change: true })
  }
  startSynthetic(): void {
    const outerhb = this.heartbeats;
    const hbs = this._heartbeatsSubject

    setInterval(() => {
      const keys = Object.keys(this.heartbeats);
      const which = keys[Math.floor(Math.random() * keys.length)]
      const m = this.heartbeats[which]
      m.tick = (m.tick + 1) % 10000;
      m.now = new Date().toISOString()
      hbs.next(outerhb)
    }, this.heartRate)
  }
}
