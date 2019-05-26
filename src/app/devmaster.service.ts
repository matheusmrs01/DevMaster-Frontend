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

  //  -----------------  JOGADDOR -----------------

  getJogador(id, token): Observable<any> {
    return this.http.get<any>(this.API_URL + '/jogador/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  getJogadores(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/jogador', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  save(username: string, senha: string, privatetoken: string, first_name: string, last_name: string, email: string, image: string) {

    const jogador = {
      "user": {
        "username": username,
        "password": senha,
        "first_name": first_name,
        "last_name": last_name,
        "email": email
      },
      "private_token": privatetoken,
      "url_imagem": image
    };
    return this.http.post(this.API_URL + '/criarjogador', JSON.parse(JSON.stringify(jogador)));
  }

  //  -----------------  JOGADDOR ITEM -----------------

  getJogadorItens(token) {
    return this.http.get(this.API_URL + '/jogadoritens/itens', {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  //  -----------------  EVENTO -----------------

  getEventos(token) {
    return this.http.get(this.API_URL + '/evento/consultarEventos', {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  getEvento(token, id) {
    return this.http.get(this.API_URL + '/evento/consultarEvento/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  getPremiacao(token, id) {
    return this.http.get(this.API_URL + '/evento/PremiacaoEvento/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  gerarPremiacao(token, id){
    return this.http.get(this.API_URL + '/evento/gerarPremiacao/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  // -------------------- LOCAL STORAGE -------------------

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

