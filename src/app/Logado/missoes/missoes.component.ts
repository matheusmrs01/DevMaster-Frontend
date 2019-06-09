import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-missoes',
  templateUrl: './missoes.component.html',
  styleUrls: ['./missoes.component.css']
})
export class MissoesComponent implements OnInit {
  usuario = null;
  constructor(private router: Router) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();
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
