import { Component } from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';

@Component({
  selector: 'app-personagens',
  standalone: true,
  imports: [CabecalhoComponent],
  templateUrl: './personagens.component.html',
  styleUrl: './personagens.component.scss'
})
export class PersonagensComponent {

}
