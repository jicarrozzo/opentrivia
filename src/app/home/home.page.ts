import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	questions: any;
	categories: any;

	constructor(private loadingCtrl: LoadingController, private opentriviaService: OpenTriviaService) {}

	ngOnInit() {
		// this.
		this.getQuestions();
	}

	async getCategories() {
		await this.opentriviaService.getCategories().subscribe(
			res => {
				console.log(res);
				this.categories = res;
			},
			err => {
				console.log(err);
			}
		);
	}

	async getQuestions() {
		const loading = await this.loadingCtrl.create({
			message: 'Getting questions',
			duration: 2000
		});
		await loading.present();

		await this.opentriviaService.getQuestions().subscribe(
			res => {
				console.log(res);
				this.questions = res;
				loading.dismiss();
			},
			err => {
				console.log(err);
				loading.dismiss();
			}
		);
	}
}
