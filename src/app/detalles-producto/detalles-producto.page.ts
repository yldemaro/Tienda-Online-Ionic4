import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.page.html',
  styleUrls: ['./detalles-producto.page.scss'],
})
export class DetallesProductoPage implements OnInit {
  image: any;
  item: any;
  preg: any;
  id: any;
  uid: any;
  ids: any;
  pregunta: any;
  respuesta: any;
  resps: any[] = [];
  aux: any[] = [];
  cargando: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router, private services: FirebaseService) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.uid = firebase.auth().currentUser.uid;
    this.cargando = true;
  }

  ngOnInit() {
    this.getData();
    this.getPreg();
  }


  getData() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data;
        this.image = this.item.image;
        this.ids = this.item.uid;
      }
    });
  }

  getPreg() {
    this.services.getPreguntas(this.id).subscribe((data: any) => {
      // console.log(data);
      this.preg = data;
      this.cargando = false;
      if (this.cargando === false) {
        this.getResp();
      }
    });
  }


  createRespuesta(idPregunta, respuesta, idPregunto) {
    let data = {
      idPregunta: idPregunta,
      idPregunto: idPregunto,
      respuesta: respuesta,
      idProducto: this.id,
      idRespondio: this.uid
    };
    console.log(data);
    this.services.createResp(data)
      .then(
        res => {
          console.log(res);
        }
      );
  }

  getResp() {
    this.services.getRespuesta(this.id).subscribe((data2: any) => {
      console.log(data2);
      this.cargando = false;
      this.resps = data2;
    });
  }

  iraprofile(id) {
    console.log(id);
    this.router.navigate(['/profile', id]);
  }

  preguntar(pregunta) {
    console.log(pregunta);
    let data = {
      nombre: pregunta,
      uidPreg: this.uid
    };
    this.services.createPregunta(this.id, data)
      .then(
        res => {
          console.log(res);
          pregunta = '';
        }
      );
  }

}
