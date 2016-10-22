import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { GunService } from '../../services/gun.service';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  private heartbeats: any = {}
  private subscription
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private gunService: GunService) {
  }
  ngOnInit(): void {
    // Setup for service observables, best not in constructor
    this.initHeartbeats();
  }
  ngOnDestroy() { 
    console.log('OnDestroy')
    this.subscription.unsubscribe();
    this.heartbeats={};
  }

  initHeartbeats(): void {
    this.subscription = this.gunService
      .getHeartbeats()
      .subscribe((heartbeats) => {
        // console.log('<< observer received heartbeat update')
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
