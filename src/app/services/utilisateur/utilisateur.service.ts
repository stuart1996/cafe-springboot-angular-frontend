import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signUp(data: any){
    return this.httpClient.post(this.url+
      "/utilisateur/signup", data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  passwordOublie(data: any){
    return this.httpClient.post(this.url+
      "/utilisateur/passwordOublie", data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
}
