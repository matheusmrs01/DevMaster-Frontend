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

  updateUsuarioXP_MF(xp, mf, id){
    const xpJ = {"xp_total": xp, "m_realizadas": mf};
    return this.http.patch(this.API_URL + '/jogador/' +id, xpJ, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
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

  // -------------------- MISSÕES -------------------

  addMissao(missao){
    return this.http.post(this.API_URL + '/criarmissao', missao, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  updateMissao(id, aux){
    let missao;
    if(aux){
      missao = {"status": true, "nice_tempo": aux};
    }
    else{
      missao = {"status": true, "nice_tempo": aux, "xp_missao": 40};

    }
    return this.http.patch(this.API_URL + '/missao/' + id, missao, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getMissoes(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/missao', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  // -------------------- GRUPOS  -------------------

  getGrupos(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/grupo/listarGrupos', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getGrupo(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/grupo/consultarGrupo/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getMissoesGrupo(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/grupo/missoes/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  // -------------------- DESAFIOS -------------------

  getDesafios(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/desafio/listarDesafios', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  criarDesafio(name, desafiado, is_item, item=null){
    let desafio
    if(is_item){
      desafio = {
        "name": name, 
        "desafiado": desafiado, 
        "is_item": is_item,
        "item_desafiante": item
      };
    } else {
      desafio = {
        "name": name, 
        "desafiado": desafiado, 
        "is_item": is_item
      };
    }
    return this.http.post(this.API_URL + '/desafio/criarDesafio', desafio, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  updateItem(id, item=null){
    let body
    if(item){
      body = {"id": id, "item": item}
    }
    else{
      body = {"id": id, "item": false}
    }
    return this.http.put<any[]>(this.API_URL + '/desafio/trocarItemDesafio', body, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  mudarStatusDesafio(id, status){
    const body = {"id": id, "status": status}
    return this.http.put<any[]>(this.API_URL + '/desafio/mudarStatus', body, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getMissoesDesafio(id){
    return this.http.get<any[]>(this.API_URL + '/missaodesafio/consultarMissoesDesafio/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  addMissoesDesafio(desafio, missao){
    const body = {"id_desafio": desafio, "id_missao": missao}
    return this.http.post<any[]>(this.API_URL + '/missaodesafio/addMissoesDesafio', body, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  removeMissaoDesafio(id){
    return this.http.delete<any[]>(this.API_URL + '/missaodesafio/deleteMissoesDesafio/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }
  
  deletarDesafio(id){
    return this.http.delete<any[]>(this.API_URL + '/desafio/deletarDesafio/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  // -------------------- BURNDOWN -------------------

  getBurndowns(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/burndown/ListarBurndown', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getBurndown(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/burndown/ConsultarBurndown/' + id, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
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

