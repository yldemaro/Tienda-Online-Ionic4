import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

  validations_form: FormGroup;
  image: any;
  validation_messages = {
    'nombre': [
      { type: 'maxlength', message: 'Solo puede introducir un maximo de 25 caracteres.' }
    ],
    'ubicacion': [
      { type: 'maxlength', message: 'Solo puede introducir un maximo de 50 caracteres' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public router: Router,
    private webview: WebView,
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.image = './assets/imgs/user.png';
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required])),
      ubicacion: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required])),
      telefono: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    let data = {
      nombre: value.nombre,
      ubicacion: value.ubicacion,
      telefono: value.telefono,
      image: this.image
    };
    this.firebaseService.createPerfil(data)
      .then(
        res => {
          this.router.navigate(['/home']);
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
            quality: 50
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
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
      .then(photoURL => {
        this.image = photoURL;
        loading.dismiss();
        toast.present();
      }, err => {
        console.log(err);
      });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
