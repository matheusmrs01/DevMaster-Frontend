import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DevmasterService } from '../../devmaster.service';
import { GitlabService } from '../../gitlab.service';

@Component({
  selector: 'app-missoes-solo',
  templateUrl: './missoes-solo.component.html',
  styleUrls: ['./missoes-solo.component.css']
})
export class MissoesSoloComponent implements OnInit {
  user: any = null;
  projeto_id: any = null;
  issues: any = [];
  missoes: any[] = null;
  nao_realizou_missao: boolean = false;
  xp_missao: any = 0;
  jogador_id: any = null;
  usuario = null;
  gitlab_username = null;
  projeto = null


  constructor(
    private routeAc: ActivatedRoute,
    private router: Router,
    private devMasterService: DevmasterService,
    private gitlabService: GitlabService
  ) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();
    
    this.projeto_id = parseInt(this.routeAc.snapshot.paramMap.get('id'));
    
    this.gitlabService.getProject(this.projeto_id).subscribe( Projeto => {
      this.projeto = Projeto['name']
      },
      Error => {
        this.projeto = 'Erro no getProject'
      }
    )

    this.devMasterService.getMissoes().subscribe(Missoes => {
      this.missoes = Missoes;
      this.devMasterService.getJogador(JSON.parse(localStorage.getItem('Usuario Logado')).id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(Jogador => {
        this.jogador_id = Jogador.id;
      });
    });
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
