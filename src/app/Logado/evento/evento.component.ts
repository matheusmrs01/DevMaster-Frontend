import { Component, OnInit } from '@angular/core';
import { DevmasterService } from '../../devmaster.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  eventos = null;

  constructor(
    private devMasterService: DevmasterService
  ) { }

  ngOnInit() {
    
    this.devMasterService.getEventos(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      Eventos => {
        this.eventos = Eventos['list'];
        console.log(this.eventos)
      },
      Erros => {
        this.eventos = 'Error no getEventos';
      }
    );

  }

}
