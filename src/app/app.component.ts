import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
      }, () => {
        this.splashScreen.hide();
      });
      this.statusBar.styleDefault();

      this.fcm.getToken().then(token => {
        alert('este es el token del dispositivo' + token);
      }).catch(error => {
        console.log('error en el token del dispositivo' + error);
      });


      this.fcm.onTokenRefresh().subscribe(token => {
        console.log('actualizacion de token' + token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in segundo plano' + data);
        } else {
          console.log('Received in primer plano' + data);
        }
      });

    });
  }
}
