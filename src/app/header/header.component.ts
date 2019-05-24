import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { DevmasterService } from '../devmaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario = null;

  constructor(private devMasterService: DevmasterService, private router: Router, private location: Location, ) { }

  ngOnInit() {
    this.atualizar();
  }

  logout() {
    this.devMasterService.logout();
    this.atualizar();
    this.router.navigate(['']);
  }

  atualizar(){
    let userL = 'Usuario Logado';
    this.usuario = JSON.parse(localStorage.getItem('Usuario Logado'));
    console.log(this.usuario)
  }

}
