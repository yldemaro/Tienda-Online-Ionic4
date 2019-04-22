import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  veh: Array<any>;
  viveres: Array<any>;
  telf: Array<any>;
  uid: any;
  electr:any;

  slideOpts = {
    effect: 'flip',
    spaceBetween: 10,
    centeredSlides: true
  };

  expanded: boolean;


  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private services: FirebaseService,
    private route: ActivatedRoute
  ) {
    this.uid = firebase.auth().currentUser.uid;
    // console(this.uid);
  }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getInmueble();
      this.getVehiculo();
      this.getViveres();
      this.getTelefonos();
      this.getElectrodomesticos();
    }
  }

  async getInmueble() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['inm'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }

  async getViveres() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['vi'].subscribe(data => {
        loading.dismiss();
        this.viveres = data;
      });
    });
  }

  async getElectrodomesticos() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['electr'].subscribe(data => {
        loading.dismiss();
        this.electr = data;
      });
    });
  }

  async getVehiculo() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);


    this.route.data.subscribe(routeData => {
      routeData['aut'].subscribe(data => {
        loading.dismiss();
        this.veh = data;
      });
    });
  }

  async getTelefonos() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);


    this.route.data.subscribe(routeData => {
      routeData['tel'].subscribe(data => {
        loading.dismiss();
        this.telf = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout() {
    this.authService.doLogout()
      .then(res => {
        this.router.navigate(['/login']);
      }, err => {
        // console(err);
      });
  }

}
