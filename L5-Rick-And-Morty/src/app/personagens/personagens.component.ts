import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-personagens',
  standalone: true,
  imports: [CabecalhoComponent, SidebarComponent],
  templateUrl: './personagens.component.html',
  styleUrl: './personagens.component.scss'
})
export class PersonagensComponent {

}
