import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PersonagensComponent } from './personagens/personagens.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'personagens', component: PersonagensComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }