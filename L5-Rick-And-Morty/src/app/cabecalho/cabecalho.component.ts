import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  constructor(private router: Router) { }

  changeLinkToHome() {
    this.router.navigateByUrl('/');
  }

  changeLinkToPersonagens() {
    this.router.navigateByUrl('/personagens');
  }

  changeLinkToEpisodios() {
    this.router.navigateByUrl('/episodios');
  }

  changeLinkToLocalizações() {
    this.router.navigateByUrl('/localizacoes');
  }
}
