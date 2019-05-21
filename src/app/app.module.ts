import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './Deslogado/login/login.component';
import { CriarJogadorComponent } from './Deslogado/criar-jogador/criar-jogador.component';
import { HomeComponent } from './Deslogado/home/home.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CriarJogadorComponent },
  // { path: 'projetos', component: ProjetosComponent },
  // { path: 'missoes/:id', component: MissoesComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CriarJogadorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
