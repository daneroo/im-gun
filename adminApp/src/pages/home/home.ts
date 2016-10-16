import Rx from 'rxjs/Rx';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { GunService } from '../../services/gun.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GunService]
})
export class HomePage implements OnInit {
  heartbeats: any
  rand: any
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private gunService: GunService) {
  }
  ngOnInit(): void {
    this.getHeartbeats();

    this.gunService
      .getRands()
      .subscribe(rand=>{
        console.log(`<< observer received ${rand}`)
        this.rand = rand
      })
    // setTimeout(()=>{
    //   obs.subscribe(value => console.log("<< observer 2 received " + value));
    // },3000)

  }
  getHeartbeats(): void {
    this.gunService
      .getHeartbeats()
      .then((heartbeats) => {
        this.heartbeats = heartbeats
        console.log(this.heartbeats)
      })
  }

  clearLocalStorage() {
    console.log('Clearing localStorage')
    localStorage.clear()
    let toast = this.toastCtrl.create({
      message: 'Local Storage Cleared',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
