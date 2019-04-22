import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  errorMessage: string = '';
  successMessage: string = '';

  categoria: any[] = [{ nombre: 'viveres' },
  { nombre: 'vehiculos' },
  { nombre: 'inmuebles' },
  { nombre: 'telefonos' },
  { nombre: 'electrodomesticos' },
  ];

  validation_messages = {
    'title': [
      { type: 'maxlength', message: 'Solo puede introducir un maximo de 25 caracteres.' }
    ],
    'description': [
      { type: 'maxlength', message: 'Solo puede introducir un maximo de 100 caracteres' }
    ]
  };

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView
  ) { }

  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.image = './assets/imgs/default_image.jpg';
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required])),
      description: new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.required])),
      categoria: new FormControl('viveres', Validators.required),
      precio: new FormControl(0, Validators.required),
      divisa: new FormControl('Bss', Validators.required),
    });
  }

  onSubmit(value) {
    let data = {
      title: value.title,
      categoria: value.categoria,
      description: value.description,
      divisa: value.divisa,
      precio: value.precio,
      image: this.image
    };
    this.firebaseService.createTask2(data);
    this.firebaseService.createTask(data)
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
        } else {
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
