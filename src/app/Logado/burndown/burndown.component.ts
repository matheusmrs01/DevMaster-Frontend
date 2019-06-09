import { Component, OnInit } from '@angular/core';
import { DevmasterService } from '../../devmaster.service';
import { Router } from "@angular/router";

@Component({
   selector: 'app-burndown',
   templateUrl: './burndown.component.html',
   styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {
   usuario = null;
   burndowns = null
   type = 'LineChart';
   data = [];
   options = {
      hAxis: {
         title: 'Dias'
      },
      vAxis: {
         title: 'Sprint Packlog'
      },
      backgroundColor: '#f9f9f9',
      pointSize: 3
   };
   width = 1000;
   height = 400;

   constructor(private devMasterService: DevmasterService, private router: Router) { }

   ngOnInit() {
      this.atualizar();
      this.navegacao();
      this.devMasterService.getBurndowns().subscribe(
         Burndowns => {
            this.burndowns = Burndowns['List'];
         },
         Erros => {
            this.burndowns = 'Error no getEventos';
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
   getQuantidade(burndown) {
      if (burndown.quantidade_queimada_dia0 != null) {
         return burndown.quantidade_queimada_dia0 + burndown.quantidade_queimada_dia1 + burndown.quantidade_queimada_dia2 + burndown.quantidade_queimada_dia3 + burndown.quantidade_queimada_dia4 + burndown.quantidade_queimada_dia5
      } else {
         return burndown.quantidade_queimada_dia1 + burndown.quantidade_queimada_dia2 + burndown.quantidade_queimada_dia3 + burndown.quantidade_queimada_dia4 + burndown.quantidade_queimada_dia5
      }
   }

   getData(burndown) {
      this.data = []
      let aux = 0
      if (burndown.quantidade_missao_falta != null) {
         this.data.push(['Inicial', burndown.quantidade_missao + burndown.quantidade_missao_falta])
         this.data.push(['Dia 0', burndown.quantidade_missao + burndown.quantidade_missao_falta])

         if (burndown.quantidade_queimada_dia1 != null) {
            aux = aux + burndown.quantidade_missao + burndown.quantidade_missao_falta
            this.data.push(['Dia 1', aux - burndown.quantidade_queimada_dia1])
         } else {
            this.data.push(['Dia 1', null])
         }

         if (burndown.quantidade_queimada_dia2 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 2', aux - burndown.quantidade_queimada_dia2])
         } else {
            this.data.push(['Dia 2', null])
         }

         if (burndown.quantidade_queimada_dia3 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 3', aux - burndown.quantidade_queimada_dia3])
         } else {
            this.data.push(['Dia 3', null])
         }

         if (burndown.quantidade_queimada_dia4 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 4', aux - burndown.quantidade_queimada_dia4])
         } else {
            this.data.push(['Dia 4', null])
         }

         if (burndown.quantidade_queimada_dia5 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 5', aux - burndown.quantidade_queimada_dia5])
         } else {
            this.data.push(['Dia 5', null])
         }
      } else {
         this.data.push(['Inicial', burndown.quantidade_missao])

         if (burndown.quantidade_queimada_dia1 != null) {
            this.data.push(['Dia 1', burndown.quantidade_missao - burndown.quantidade_queimada_dia1])
         } else {
            this.data.push(['Dia 1', null])
         }

         if (burndown.quantidade_queimada_dia2 != null) {
            aux = aux + burndown.quantidade_missao - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 2', aux - burndown.quantidade_queimada_dia2])
         } else {
            this.data.push(['Dia 2', null])
         }

         if (burndown.quantidade_queimada_dia3 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 3', aux - burndown.quantidade_queimada_dia3])
         } else {
            this.data.push(['Dia 3', null])
         }

         if (burndown.quantidade_queimada_dia4 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 4', aux - burndown.quantidade_queimada_dia4])
         } else {
            this.data.push(['Dia 4', null])
         }

         if (burndown.quantidade_queimada_dia5 != null) {
            aux = aux - burndown.quantidade_queimada_dia1
            this.data.push(['Dia 5', aux - burndown.quantidade_queimada_dia5])
         } else {
            this.data.push(['Dia 5', null])
         }
      }
   }

}
