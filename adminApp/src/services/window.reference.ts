import { Injectable } from '@angular/core';

/* No longer used, 
  but when I needed a reference to global window object,
  for the <script src="gun.js">
  this is how it was wired

  constructor(private winRef: WindowRef) {
    // console.log('window.Gun', winRef.nativeWindow.Gun)
    this.Gun = winRef.nativeWindow.Gun
  }
  */

function _window(): any {
  // return the native window obj
  return window;
}

@Injectable()
export class WindowRef {

  get nativeWindow(): any {
    return _window();
  }

}
