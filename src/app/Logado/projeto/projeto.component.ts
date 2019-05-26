import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GitlabService } from '../../gitlab.service';
import { DevmasterService } from '../../devmaster.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  projetos: any = null;
  tipo: any = null;
  grupos: any = null;

  constructor(
    private gitlabService: GitlabService, 
    private routeAc: ActivatedRoute, 
    private devMasterService: DevmasterService
    ) { }

  ngOnInit() {
    this.tipo = parseInt(this.routeAc.snapshot.paramMap.get('id'));
    if (this.tipo == 1) {
      this.gitlabService.getProjetos(JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token).subscribe(Projetos => {
        this.projetos = Projetos;
      });
    }

    if (this.tipo == 2) {
      this.devMasterService.getGrupos().subscribe(
        Grupos => {
          this.grupos = Grupos['List']
        },
        Error => {
          this.grupos = 'Erro no getGrupos'
        }
      )
    }
  }

}
