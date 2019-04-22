import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-update-perfil',
  templateUrl: './update-perfil.page.html',
  styleUrls: ['./update-perfil.page.scss'],
})
export class UpdatePerfilPage implements OnInit {

  image: any;
  id: any;
  uid: any;
  item: any;
  nombre: any;
  ubicacion: any;
  telefono: any;

  constructor(private services: FirebaseService,
    public router: Router,
    private route: ActivatedRoute,
    private webview: WebView,
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    this.uid = firebase.auth().currentUser.uid;
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    await this.services.getProfile(this.id).subscribe((data => {
      this.nombre = data[0].nombre;
      this.ubicacion = data[0].ubicacion;
      this.telefono = data[0].telefono;
      this.image = data[0].image;
    }));
  }

  onSubmit() {

    let data = {
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      telefono: this.telefono,
      image: this.image
    };
    console.log(data);
    this.services.updatePerfil(data)
      .then(
        res => {
          this.router.navigate(['/profile', this.uid]);
        }
      );
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
      .then((result) => {
        if (result === false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result === true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1,
            quality:50
          }).then(
            (results) => {
              for (let i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  async uploadImageToFirebase(image) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    // let image_to_convert = 'http://localhost:8080/_file_' + image;
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.services.uploadImage(image_src, randomId)
      .then(photoURL => {
        this.image = photoURL;
        loading.dismiss();
        toast.present();
      }, err => {
        console.log(err);
      })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
