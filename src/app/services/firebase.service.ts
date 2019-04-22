import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;
  private itemsCollection: AngularFirestoreCollection<any>;
  info: any[] = [];

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }


  getProductosAll() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('productos')
            .doc('ventas').collection('ventas').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }


  getElectrodomesticos() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('productos')
            .doc('ventas').collection('ventas', ref => ref.where('categoria', '==', 'electrodomesticos')).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }


  getInmuebles() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('productos')
            .doc('ventas').collection('ventas', ref => ref.where('categoria', '==', 'inmuebles')).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  getAutomoviles() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('productos')
            .doc('ventas').collection('ventas', ref => ref.where('categoria', '==', 'vehiculos')).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  getViveres() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('productos')
            .doc('ventas').collection('ventas', ref => ref.where('categoria', '==', 'viveres')).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  getPreguntas(id) {
    this.itemsCollection = this.afs.collection<any>(`productos/ventas/ventas/${id}/preguntas`);

    return this.itemsCollection.snapshotChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }
  getRespuesta(idProd) {
    this.itemsCollection = this.afs.collection<any>(`productos/ventas/ventas/${idProd}/respuesta`);

    return this.itemsCollection.valueChanges().pipe(map((info: any[]) => {
      console.log(info);
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }



  getTelefonos() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.collection('productos')
            .doc('ventas').collection('ventas', ref => ref.where('categoria', '==', 'telefonos')).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs.doc<any>('productos/' + 'ventas/' + 'ventas/' + taskId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err);
            });
        }
      });
    });
  }

  getProductosId(id) {
    this.itemsCollection = this.afs.collection<any>(`productos/${id}/ventas/`, ref => ref.where('uid', '==', `${id}`));

    return this.itemsCollection.valueChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }

  getProfile(itemId) {
    this.itemsCollection = this.afs.collection<any>(`productos/${itemId}/profile/`,
      ref => ref.orderBy('fecha', 'desc').limit(1));

    return this.itemsCollection.valueChanges().pipe(map((info: any[]) => {
      this.info = [];

      for (const infos of info) {
        this.info.unshift(infos);
      }

      return this.info;
    }));
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc(currentUser.uid).collection('ventas').doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
  updateTask2(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc('ventas').collection('ventas').doc(taskKey).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc(currentUser.uid).collection('ventas').doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
  deleteTask2(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc('ventas').collection('ventas').doc(taskKey).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  updatePerfil(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc(currentUser.uid).collection('profile').add({
        nombre: value.nombre,
        ubicacion: value.ubicacion,
        telefono: value.telefono,
        image: value.image,
        fecha: Date.now()
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createPerfil(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc(currentUser.uid).collection('profile').add({
        nombre: value.nombre,
        ubicacion: value.ubicacion,
        telefono: value.telefono,
        image: value.image,
        fecha: Date.now()
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createPregunta(id, value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('productos').doc('ventas').collection('ventas').doc(id).collection('preguntas').add({
        idProd: id,
        nombre: value.nombre,
        uidPreg: value.uidPreg,
        fecha: Date.now()
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createResp(value) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('productos').doc('ventas')
        .collection('ventas').doc(value.idProducto).collection('respuesta').add({
          idPregunta: value.idPregunta,
          idPregunto: value.idPregunto,
          idRespondio: value.idRespondio,
          respuesta: value.respuesta,
          fecha: Date.now()
        })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc(currentUser.uid).collection('ventas').add({
        title: value.title,
        description: value.description,
        categoria: value.categoria,
        divisa: value.divisa,
        precio: value.precio,
        image: value.image,
        uid: currentUser.uid,
        expanded: true,
        fecha: Date.now()
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  createTask2(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('productos').doc('ventas').collection('ventas').add({
        title: value.title,
        description: value.description,
        precio: value.precio,
        divisa: value.divisa,
        categoria: value.categoria,
        image: value.image,
        uid: currentUser.uid,
        expanded: true,
        fecha: Date.now()
      })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          });
      });
    });
  }
}
