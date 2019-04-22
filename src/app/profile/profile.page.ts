import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  item: any;
  image: any;
  id: any;
  prod: any;
  uid: any;

  constructor(private route: ActivatedRoute, private services: FirebaseService) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.uid = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
    this.getProfile();
    this.getProductos();
  }


  getProfile() {
    this.services.getProfile(this.id).subscribe((data => {
      console.log(data);
      this.item = data;
    }));
  }

  getProductos() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        console.log(data);
        this.prod = data;
      }
    });
  }

  gotoWsp(telf: string) {
    // console.log(telf);
    const newurl = 'https://api.whatsapp.com/send?phone=' + '58' + telf;
    window.open(newurl, '_system', '_blank');
  }

}
