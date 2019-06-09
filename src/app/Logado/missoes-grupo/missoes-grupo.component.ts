import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DevmasterService } from '../../devmaster.service';
import { GitlabService } from '../../gitlab.service';

@Component({
  selector: 'app-missoes-grupo',
  templateUrl: './missoes-grupo.component.html',
  styleUrls: ['./missoes-grupo.component.css']
})
export class MissoesGrupoComponent implements OnInit {
  usuario = null;
  id_grupo = null
  grupo = null 
  missoes = null
  id_jogador = null
  id_milestone = null

  constructor(
    private routeAc: ActivatedRoute,
    private router: Router,
    private devMasterService: DevmasterService,
  ) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();

    this.id_grupo = parseInt(this.routeAc.snapshot.paramMap.get('id'));

    this.devMasterService.getJogador(JSON.parse(localStorage.getItem('Usuario Logado')).id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      Jogador => {
        this.id_jogador = Jogador.id;
        console.log(this.id_jogador)
      },
      erro => {
        this.id_jogador = 'Error no GetJogador';
      }
    );

    this.devMasterService.getGrupo(this.id_grupo).subscribe( Grupo => {
      this.grupo = Grupo['Grupo']
      },
      Error => {
        this.grupo = 'Erro no getProject'
      }
    )

    this.devMasterService.getMissoesGrupo(this.id_grupo).subscribe( Missoes => {
      this.missoes = Missoes['Missoes']
      console.log(this.missoes)
      },
      Error => {
        this.missoes = 'Erro no getProject'
      }
    )

  }

  navegacao(){
    if (!this.usuario){
      this.router.navigate(['']);
    }
  }

  atualizar(){
    let userL = 'Usuario Logado';
    this.usuario = JSON.parse(localStorage.getItem(userL));
  }

}
