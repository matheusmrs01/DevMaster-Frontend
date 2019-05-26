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
        console.log(this.evento)
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
        console.log(this.premiacao)
      },
      Erros => {
        this.premiacao = 'Error no getEventos';
      }
    );
  }

}
