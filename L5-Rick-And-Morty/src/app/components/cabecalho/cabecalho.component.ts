import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss'
})
export class CabecalhoComponent {
  username: string = "";
  isListVisible: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  // Carrega o username global aqui no component
  ngOnInit() {
    this.loginService.getUserTerm().pipe(
      tap((user) => {
        this.username = user;
      })
    ).subscribe()
  }

  // Serve para manipular o menu de perfil/logout
  showList(): void {
    this.isListVisible = !this.isListVisible;
  }

  // Serve para alterar o isAuthenticated para false e fazer o logout
  logout(): void {
    this.loginService.logout();
  }

  // muda a página para /home
  changeLinkToHome() {
    this.router.navigateByUrl('/home');
  }

  // muda a página para /profile
  changeLinkToProfile() {
    this.router.navigateByUrl('/profile');
  }

  // muda a página para /personagens
  changeLinkToPersonagens() {
    this.router.navigateByUrl('/personagens');
  }

  // muda a página para /episodios
  changeLinkToEpisodios() {
    this.router.navigateByUrl('/episodios');
  }

  // muda a página para /localizacoes
  changeLinkToLocalizacoes() {
    this.router.navigateByUrl('/localizacoes');
  }
}
