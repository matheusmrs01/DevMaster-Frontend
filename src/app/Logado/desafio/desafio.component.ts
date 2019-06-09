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
  missoes_desafio = null;
  missoesfinded = null;
  missaoAdd;

  desafioFinded;


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
    },
      Erros => {
        this.jogadores = 'Error no getJogadores'
      });

    this.devMasterService.getJogador(JSON.parse(localStorage.getItem('Usuario Logado')).id, JSON.parse(localStorage.getItem('Usuario Logado')).token)
      .subscribe(Jogador => {
        this.jogador_logado = Jogador.id
      },
      Error => {
        this.jogador_logado = 'Error no getJogador'
      })

    this.devMasterService.getJogadorItens(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(Itens => {
      this.itens_jogador = Itens['List']
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

  editarItem(){
    this.devMasterService.updateItem(this.desafioFinded, this.desafio_item).subscribe(Message => {
      console.log(Message)
      this.clear()
      this.getDesafios()
    },
      Error => {
        this.criarDesafio_message = 'Erro no criarDesafio'
      });
    console.log(this.desafioFinded)
    console.log(this.desafio_item)
  }

  getMissoesDesafio(id){
    this.devMasterService.getMissoesDesafio(id).subscribe( Missoes => {
      this.missoes_desafio = Missoes['List']
    },
    Error => {
      this.missoes_desafio = 'Erro no getMissoesDesafio'
    })
  }

  addMissaoDesafio(){
    this.devMasterService.addMissoesDesafio(this.desafioFinded, this.missaoAdd).subscribe(MissaoDesafio => {
    })
  }

  getMissoes(){
    this.devMasterService.getMissoes().subscribe( Missoes => {
      this.missoesfinded = Missoes
    })
  }

  removeMissao(id){
    this.devMasterService.removeMissaoDesafio(id).subscribe(Message => {
      this.getMissoesDesafio(this.desafioFinded)
    })
  }

  mudarStatusDesafio(status){
    this.devMasterService.mudarStatusDesafio(this.desafioFinded, status).subscribe(Message => {
      this.getDesafios()
    })
  }

  clear() {
    this.desafio_name = null
    this.desafio_desafiado = null
    this.desafio_item = null
  }

}
