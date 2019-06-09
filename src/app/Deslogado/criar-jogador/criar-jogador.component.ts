import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { DevmasterService } from '../../devmaster.service';
import { GitlabService } from '../../gitlab.service';

@Component({
  selector: 'app-criar-jogador',
  templateUrl: './criar-jogador.component.html',
  styleUrls: ['./criar-jogador.component.css']
})
export class CriarJogadorComponent implements OnInit {
  usuario = null;

  username;
  senha;
  privatetoken;
  nome;
  sobrenome;
  email;
  cadastro_ok = false;
  cadastro_erro = false;

  constructor(
    private devMasterService: DevmasterService,
    private gitlabService: GitlabService,
    private router: Router
  ) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();
  }

  cadastrar() {
    this.gitlabService.getGitlabUser(this.username, this.privatetoken).subscribe(GitLabUser => {
      this.devMasterService.save(this.username, this.senha, this.privatetoken, this.nome, this.sobrenome, this.email, GitLabUser[0].avatar_url)
        .subscribe(
          usuario => {
            this.limpar();
            this.cadastro_ok = true;
            this.router.navigate(['']);
          },
          erro => {
            this.cadastro_erro = true;
            this.cadastro_ok = false;
          }
        );
    });
  }

  navegacao(){
    if (this.usuario){
      this.router.navigate(['dashboard']);
    }
  }

  atualizar(){
    let userL = 'Usuario Logado';
    this.usuario = JSON.parse(localStorage.getItem(userL));
  }

  limpar() {
    this.username = null;
    this.senha = null;
    this.privatetoken = null;
    this.nome = null;
    this.sobrenome = null;
    this.email = null;
    this.privatetoken = null;
    this.cadastro_ok = false;
    this.cadastro_erro = false;
  }
}