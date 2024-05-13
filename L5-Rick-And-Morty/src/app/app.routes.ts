import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { PersonagensComponent } from './components/personagens/personagens.component';
import { DetalhesPComponent } from './components/detalhes-p/detalhes-p.component';
import { EpisodiosComponent } from './components/episodios/episodios.component';
import { DetalhesEpComponent } from './components/detalhes-ep/detalhes-ep.component';
import { LocalizacoesComponent } from './components/localizacoes/localizacoes.component';
import { DetalhesLocComponent } from './components/detalhes-loc/detalhes-loc.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'personagens', component: PersonagensComponent, canActivate: [AuthGuard] },
    { path: 'personagens/:id', component: DetalhesPComponent, canActivate: [AuthGuard] },
    { path: 'episodios', component: EpisodiosComponent, canActivate: [AuthGuard] },
    { path: 'episodios/:id', component: DetalhesEpComponent, canActivate: [AuthGuard] },
    { path: 'localizacoes', component: LocalizacoesComponent, canActivate: [AuthGuard] },
    { path: 'localizacoes/:id', component: DetalhesLocComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }