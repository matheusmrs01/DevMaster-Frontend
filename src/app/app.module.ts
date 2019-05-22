import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { RouterModule, Routes } from '@angular/router';

import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './Deslogado/login/login.component';
import { CriarJogadorComponent } from './Deslogado/criar-jogador/criar-jogador.component';
import { HomeComponent } from './Deslogado/home/home.component';
import { DashboardComponent } from './Logado/dashboard/dashboard.component';
import { MissoesComponent } from './Logado/missoes/missoes.component';
import { MissoesSoloComponent } from './Logado/missoes-solo/missoes-solo.component';
import { MissoesGrupoComponent } from './Logado/missoes-grupo/missoes-grupo.component';
import { ProjetoComponent } from './Logado/projeto/projeto.component';
import { DesafioComponent } from './Logado/desafio/desafio.component';
import { EventoComponent } from './Logado/evento/evento.component';
import { BurndownComponent } from './Logado/burndown/burndown.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CriarJogadorComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projetos', component: ProjetoComponent },
  { path: 'missoes', component: MissoesComponent },
  { path: 'missoes-solo/:id', component: MissoesSoloComponent },
  { path: 'missoes-grupo/:id', component: MissoesGrupoComponent },
  { path: 'desafio', component: DesafioComponent },
  { path: 'evento', component: EventoComponent },
  { path: 'burndown', component: BurndownComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CriarJogadorComponent,
    HomeComponent,
    DashboardComponent,
    MissoesComponent,
    MissoesSoloComponent,
    MissoesGrupoComponent,
    ProjetoComponent,
    DesafioComponent,
    EventoComponent,
    BurndownComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
