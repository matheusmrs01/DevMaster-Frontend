import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DevmasterService {

  API_URL = 'http://127.0.0.1:8000';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public user = null;

  constructor(private http: HttpClient) { }

  login(username: string, senha: string): Observable<any> {
    const qs = { 'username': username, 'password': senha };
    return this.http.post<any>(this.API_URL + '/login/', qs);
  }

  getUser(token): Observable<any> {
    return this.http.get<any>(this.API_URL + '/user/', {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  getJogador(id, token): Observable<any> {
    return this.http.get<any>(this.API_URL + '/jogador/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  set(user, tokenn, tokengitlab) {
    let userL = 'Usuario Logado';
    let myObj = { id: user.id, username: user.username, token: tokenn, gitlab_token: tokengitlab };
    localStorage.setItem(userL, JSON.stringify(myObj));

  }

  get() {
    return this.user;
  }

  clear() {
    let userL = 'Usuario Logado';
    localStorage.removeItem(userL);
  }

  logout() {
    this.clear();
  }
}

