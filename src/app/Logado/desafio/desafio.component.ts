import { Component, OnInit } from '@angular/core';
import { DevmasterService } from '../../devmaster.service';

@Component({
  selector: 'app-desafio',
  templateUrl: './desafio.component.html',
  styleUrls: ['./desafio.component.css']
})
export class DesafioComponent implements OnInit {

  jogadores = null;
  itens_jogador = null;
  desafios = null;
  jogador_logado = null;

  desafio_name;
  desafio_desafiante;
  desafio_desafiado;
  desafio_is_item;
  desafio_item;
  criarDesafio_message;

  constructor(private devMasterService: DevmasterService) { }

  ngOnInit() {
    this.getDesafios();

    this.devMasterService.getJogadores().subscribe(Jogadores => {
      this.jogadores = Jogadores
      console.log('Jogadores:',  this.jogadores)
    },
      Erros => {
        this.jogadores = 'Error no getJogadores'
      });

    this.devMasterService.getJogador(JSON.parse(localStorage.getItem('Usuario Logado')).id, JSON.parse(localStorage.getItem('Usuario Logado')).token)
      .subscribe(Jogador => {
        this.jogador_logado = Jogador.id
        console.log(this.jogador_logado)
      },
      Error => {
        this.jogador_logado = 'Error no getJogador'
      })

    this.devMasterService.getJogadorItens(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(Itens => {
      this.itens_jogador = Itens['List']
      console.log('itens_jogador:',  this.itens_jogador)
    },
      Error => {
        this.itens_jogador = 'Error no getItens'
      });
  }

  getDesafios() {
    this.devMasterService.getDesafios().subscribe(Desafio => {
      this.desafios = Desafio['List']
      console.log('this.desafios:',  this.desafios)
    },
      Error => {
        this.desafios = 'error no getDesafio';
      });
  }

  criarDesafio() {
    if (this.desafio_item) {
      console.log('Criar Desafio com item.')
      this.desafio_is_item = true

      this.devMasterService.criarDesafio(
        this.desafio_name,
        this.desafio_desafiado,
        true,
        this.desafio_item
      ).subscribe(Message => {
        this.criarDesafio_message = Message;
        this.clear()
        this.getDesafios()
        console.log(Message)
      },
        Error => {
          this.criarDesafio_message = 'Erro no criarDesafio'
        });
    } else {
      this.desafio_is_item = false

      this.devMasterService.criarDesafio(
        this.desafio_name,
        this.desafio_desafiado,
        this.desafio_is_item
      ).subscribe(Message => {
        this.criarDesafio_message = Message;
        this.clear()
        this.getDesafios()
      },
        Error => {
          this.criarDesafio_message = 'Erro no criarDesafio'
        });
    }
  }

  clear() {
    this.desafio_name = null
    this.desafio_desafiado = null
    this.desafio_item = null
  }

}
