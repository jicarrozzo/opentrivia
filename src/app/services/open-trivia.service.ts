import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const url_questions: string = 'https://opentdb.com/api.php?amount=10';
const url_categories: string = 'https://opentdb.com/api_category.php';

const headers = {
	headers: new HttpHeaders({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class OpenTriviaService {
	constructor(public http: HttpClient) {}

	//#region private handlers
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	}

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}
	//#endregion

	getCategories(): Observable<any> {
		return this.http.get(url_categories, headers).pipe(
			map(this.extractData),
			catchError(this.handleError)
		);
	}
	getQuestions(): Observable<any> {
		return this.http.get(url_questions, headers).pipe(
			map(this.extractData),
			catchError(this.handleError)
		);
	}
}
