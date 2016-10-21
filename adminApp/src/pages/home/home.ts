import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { GunService } from '../../services/gun.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  heartbeats: any
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private gunService: GunService) {
  }
  ngOnInit(): void {
    // Setup for service observables, best not in constructor
    this.initHeartbeats();
  }

  initHeartbeats(): void {
    this.gunService
      .getHeartbeats()
      .subscribe((heartbeats) => {
        console.log('<< observer received heartbeat update')
        this.heartbeats = heartbeats
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
