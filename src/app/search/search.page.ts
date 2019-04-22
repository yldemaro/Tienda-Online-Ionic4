import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
	textoBuscar = '';
	items: any;

	constructor(
		public loadingCtrl: LoadingController,
		private route: ActivatedRoute
	) {
		// this.route.data.subscribe(routeData => {
		// 	routeData['data'].subscribe(data => {
		// 		this.items = data;
		// 	});
		// });
	}

	ngOnInit() {
		this.getData();
	}


	async getData() {

		await this.route.data.subscribe(routeData => {
			routeData['data'].subscribe(data => {
				this.items = data;
			});
		});
	}


	buscarProducto(event) {

		const texto = event.target.value;
		console.log(texto);
		this.textoBuscar = texto;
		console.log(this.textoBuscar);
	}

}
