import { Component, OnInit } from '@angular/core';
import { DevmasterService } from '../../devmaster.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  eventos = null;
  evento = null;
  premiacao = null;

  constructor(
    private devMasterService: DevmasterService
  ) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.devMasterService.getEventos(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      Eventos => {
        this.eventos = Eventos['list'];
      },
      Erros => {
        this.eventos = 'Error no getEventos';
      }
    );
  }

  getEvento(id) {
    this.devMasterService.getEvento(JSON.parse(localStorage.getItem('Usuario Logado')).token, id).subscribe(
      Evento => {
        this.evento = Evento['Evento'];
      },
      Erros => {
        this.evento = 'Error no getEventos';
      }
    );
  }

  getPremiacao(id){
    this.devMasterService.getPremiacao(JSON.parse(localStorage.getItem('Usuario Logado')).token, id).subscribe(
      Premiacao => {
        this.premiacao = Premiacao['Premiacao'];
      },
      Erros => {
        this.premiacao = 'Error no getEventos';
      }
    );
  }

  gerarPremiacao(id){
    this.devMasterService.gerarPremiacao(JSON.parse(localStorage.getItem('Usuario Logado')).token, id).subscribe(
      Premiacao => {
        this.premiacao = Premiacao;
        this.getEventos();
      },
      Erros => {
        this.premiacao = 'Error no getEventos';
      }
    );
  }

}
