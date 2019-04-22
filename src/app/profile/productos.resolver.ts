import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class ProductosResolver implements Resolve<any> {

    constructor(public firebaseService: FirebaseService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return new Promise((resolve, reject) => {
            let itemId = route.paramMap.get('id');
            this.firebaseService.getProductosId(itemId)
                .subscribe(data => {
                    console.log(data);
                    resolve(data);
                }, err => {
                    reject(err);
                });
        });
    }
}
