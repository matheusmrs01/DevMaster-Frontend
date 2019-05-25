import { Component, OnInit } from '@angular/core';
import { DevmasterService } from '../../devmaster.service';
import { Items } from '@clr/angular/data/datagrid/providers/items';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jogador = null;
  jogador_itens = null;
  public xp_total = 8;
  data = new Date('2018-10-27');
  data2 = new Date('2018-10-22');
  nivel;
  progress;
  niveis = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];

  constructor(
    private devMasterService: DevmasterService
  ) { }

  ngOnInit() {

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
        this.jogador_itens = Items
        console.log(this.jogador_itens)
      },
      erro => {
        this.jogador_itens = 'Error no GetItens'
      }
    );

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
