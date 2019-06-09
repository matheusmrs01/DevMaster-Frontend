import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DevmasterService } from '../../devmaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = null;
  username;
  senha;
  erro = null;
  user = null;

  constructor(private userService: DevmasterService, private router: Router) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();
    this.user = this.userService.get();
  }

  entrar() {
    this.userService.login(this.username, this.senha)
      .subscribe(token => {
        this.erro = null;
        this.userService.getUser(token.key).subscribe(Usuario => {
          this.userService.getJogador(Usuario.id, token.key).subscribe(Jogador => {
            this.userService.set(Usuario, token.key, Jogador.private_token);
            // this.router.navigate(['']);
            location.reload();
          });
        });

      },
        erro => {
          this.erro = 'Login ou senha incorretos';
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
}
