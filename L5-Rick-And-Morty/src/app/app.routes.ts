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
    { path: 'home', component: HomeComponent },
    { path: 'personagens', component: PersonagensComponent },
    { path: 'personagens/:id', component: DetalhesPComponent },
    { path: 'episodios', component: EpisodiosComponent },
    { path: 'episodios/:id', component: DetalhesEpComponent },
    { path: 'localizacoes', component: LocalizacoesComponent },
    { path: 'localizacoes/:id', component: DetalhesLocComponent },
    { path: 'profile', component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }