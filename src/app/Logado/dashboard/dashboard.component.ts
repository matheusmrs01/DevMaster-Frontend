import { Component, OnInit } from '@angular/core';
import { DevmasterService } from '../../devmaster.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario = null;
  jogador = null;
  jogador_itens = null;

  users_xp: any = null;
  users_m: any = null;
  users_d: any = null;
  users_e: any = null;

  public xp_total = 8;
  data = new Date('2018-10-27');
  data2 = new Date('2018-10-22');
  nivel;
  progress;
  niveis = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];

  constructor(
    private devMasterService: DevmasterService, private router: Router
  ) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();

    this.devMasterService.getJogadores().subscribe(Jogadores => {
      this.users_xp = this.getUsersPorXP(Jogadores);
      this.users_m = this.getUsersPorM(Jogadores);
      this.users_d = this.getUsersPorD(Jogadores);
      this.users_e = this.getUsersPorE(Jogadores);
    });

    this.devMasterService.getUser(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      User => {
        this.devMasterService.getJogador(User.id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
          Jogador => {
            this.jogador = Jogador;
            this.progress = this.getProgress(Jogador.xp_total);
          },
          erro => {
            this.jogador = 'Error no GetJogador';
          }
        );
      },
      erro => {
        this.jogador = 'Error no getUser';
      }
    );

    this.devMasterService.getJogadorItens(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      Items => {
        this.jogador_itens = Items['List']
      },
      erro => {
        this.jogador_itens = 'Error no GetItens'
      }
    );
  }


  navegacao() {
    if (!this.usuario) {
      this.router.navigate(['']);
    }
  }

  atualizar() {
    let userL = 'Usuario Logado';
    this.usuario = JSON.parse(localStorage.getItem(userL));
  }

  getUsersPorXP(jogadores) {
    let usuarios = jogadores.slice();

    for (let i = 0; i < usuarios.length; i++) {
      for (let j = 0; j < usuarios.length - 1; j++) {
        if (usuarios[j].xp_total < usuarios[j + 1].xp_total) {
          let swap = usuarios[j];
          usuarios[j] = usuarios[j + 1];
          usuarios[j + 1] = swap;
        }
      }
    }
    return usuarios;
  }

  getUsersPorM(jogadores) {
    let usuarios = jogadores.slice();
    for (let i = 0; i < usuarios.length; i++) {
      for (let j = 0; j < usuarios.length - 1; j++) {

        if (usuarios[j].m_realizadas < usuarios[j + 1].m_realizadas) {
          let swap = usuarios[j];
          usuarios[j] = usuarios[j + 1];
          usuarios[j + 1] = swap;
        }
      }
    }
    return usuarios;
  }

  getUsersPorD(jogadores) {
    let usuarios = jogadores.slice();
    for (let i = 0; i < usuarios.length; i++) {
      for (let j = 0; j < usuarios.length - 1; j++) {

        if (usuarios[j].desafios_v < usuarios[j + 1].desafios_v) {
          let swap = usuarios[j];
          usuarios[j] = usuarios[j + 1];
          usuarios[j + 1] = swap;
        }
      }
    }
    return usuarios;
  }

  getUsersPorE(jogadores) {
    let usuarios = jogadores.slice();
    for (let i = 0; i < usuarios.length; i++) {
      for (let j = 0; j < usuarios.length - 1; j++) {

        if (usuarios[j].eventos_v < usuarios[j + 1].eventos_v) {
          let swap = usuarios[j];
          usuarios[j] = usuarios[j + 1];
          usuarios[j + 1] = swap;
        }
      }
    }
    return usuarios;
  }

  getData() {
    const hoje: Date = new Date();
    if (this.data >= hoje) {
      return 'Você esta no dia certo';
    }
    else {
      return 'Voce esta atrasado';
    }

  }

  getNivel(xp_total) {
    let nivel = 0;
    for (let xp of this.niveis) {
      if (xp_total >= xp) {
        nivel = nivel + 1;
      }
    }
    return nivel;
  }
  getProgress(xp_total) {
    let nivel = 0;
    for (let xp of this.niveis) {
      if (xp_total >= xp) {
        nivel = nivel + 1;
      }
    }

    let x = (100 * xp_total) / this.niveis[nivel];
    return Math.round(x);
  }

}
