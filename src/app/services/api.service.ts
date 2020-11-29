import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:3000/api';
  token;
  user;

  constructor(private http: HttpClient) { }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  signup(name, email, password) {
    return this.http.post(this.API_URL + '/auth/signup',
      {
        name, email, password
      }).pipe(retry(3), catchError(this.handleError));
  }

  login(email, password) {
    return this.http.post(this.API_URL + '/auth/signin', { email, password })
      .pipe(retry(3), catchError(this.handleError));
  }

  getAllLocations(){
    return this.http.get<any>(this.API_URL+'/locations/all', this.getHeaders())
 
     .pipe(catchError(this.handleError))
  }

  searchLocation(name){
    return this.http.post<any>(this.API_URL + '/locations/search', {
      name
    }, this.getHeaders())
  }
  

  addLocation(name, address, phone, type){
    // console.log(localStorage.getItem('token'));
    return this.http.post<any>(this.API_URL + '/locations/add', {
     name, address, phone, type
   }, this.getHeaders())
  }

  addFavorite(name, address, phone, type, userId, locationId){
    return this.http.post<any>(this.API_URL + '/favorites/add', {
      name, address, phone, type, locationId, userId
    }, this.getHeaders())
  }

  deleteFavorite(id){
    return this.http.post<any>(this.API_URL + '/favorites/deleteFavorite', {
      id
    }, this.getHeaders())
  }

  getUserFavorite(userId){
    console.log(userId);
    return this.http.post<any>(this.API_URL + '/favorites/all', {
      userId
    }, this.getHeaders())
  }

  checkFavorites(userId, locationId){
    return this.http.post<any>(this.API_URL + '/favorites/checkFavorite', {
      userId, locationId
    }, this.getHeaders())
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return httpOptions
  }

  clearData(){
    localStorage.clear();
    this.user = null;
    this.token = null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
