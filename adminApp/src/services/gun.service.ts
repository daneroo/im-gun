import Rx from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import Gun from 'gun/gun.js'

@Injectable()
export class GunService {

  // private peers = ['8080']
  // private peers = ['8080', '8081', '8082']
  private peers = ['8082','8081', '8080']
    .map(p => `http://localhost:${p}/gun`)

  private _heartbeatsSubject: Rx.BehaviorSubject<any>;

  constructor() {
    console.log('imported Gun', Gun)
  }

  private heartbeats = {
    "localhost:8080": {
      tick: 35,
      stamp: "2016-10-15T19:25:58.951Z",
      lastSeen: "2016-10-15T19:25:58.951Z",
      latencies: [26, 35],
    },
    "localhost:8081": {
      tick: 29,
      stamp: "2016-10-15T19:25:57.976Z"
    },
    "localhost:8082": {
      tick: 95,
      stamp: "2016-10-16T04:09:33.877Z"
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

  private startGun(): void {
    console.log('peers', this.peers)
    const gun = Gun(this.peers);

    const heartbeatsGun = gun.get('heartbeats');
    const self = this
    heartbeatsGun.map(function (o, peer) {
      // console.log(`-heartbeats[${peer}] >> ${JSON.stringify(o)}`)

      const hb = self.heartbeats[peer]
      hb.tick = o.tick
      hb.stamp = o.stamp
      self.latency(hb)
      console.log(`-heartbeats[${peer}] >> ${JSON.stringify(hb)}`)

      self._heartbeatsSubject.next(self.heartbeats)

    }, { change: true })
  }

  private latency(hb): void {
    const now = new Date().getTime()
    const stamp = new Date(hb.stamp).getTime()
    if (hb.lastSeen !== hb.stamp) {
      hb.latencies = []
      hb.lastSeen = hb.stamp
    }
    hb.latencies.push(now - stamp)
  }


  // private heartRate = 10000 // ms
  // private startSynthetic(): void {
  //   const self = this
  //   setInterval(() => {
  //     const keys = Object.keys(this.heartbeats);
  //     const which = keys[Math.floor(Math.random() * keys.length)]
  //     const m = self.heartbeats[which]
  //     m.tick = (m.tick + 1) % 10000;
  //     m.stamp = new Date().toISOString()
  //     self._heartbeatsSubject.next(self.heartbeats)
  //   }, this.heartRate)
  // }
}
