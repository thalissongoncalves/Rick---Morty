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

  ngOnInit() {
    this.loginService.getUserTerm().pipe(
      tap((user) => {
        this.username = user;
      })
    ).subscribe()
  }

  showList(): void {
    this.isListVisible = !this.isListVisible;
  }

  logout(): void {
    this.loginService.logout();
  }

  changeLinkToHome() {
    this.router.navigateByUrl('/home');
  }

  changeLinkToProfile() {
    this.router.navigateByUrl('/profile');
  }

  changeLinkToPersonagens() {
    this.router.navigateByUrl('/personagens');
  }

  changeLinkToEpisodios() {
    this.router.navigateByUrl('/episodios');
  }

  changeLinkToLocalizacoes() {
    this.router.navigateByUrl('/localizacoes');
  }
}
