import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PersonagensComponent } from './personagens/personagens.component';
import { DetalhesPComponent } from './detalhes-p/detalhes-p.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { DetalhesEpComponent } from './detalhes-ep/detalhes-ep.component';
import { LocalizacoesComponent } from './localizacoes/localizacoes.component';
import { DetalhesLocComponent } from './detalhes-loc/detalhes-loc.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'personagens', component: PersonagensComponent },
    { path: 'personagens/:id', component: DetalhesPComponent },
    { path: 'episodios', component: EpisodiosComponent },
    { path: 'episodios/:id', component: DetalhesEpComponent },
    { path: 'localizacoes', component: LocalizacoesComponent },
    { path: 'localizacoes/:id', component: DetalhesLocComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }